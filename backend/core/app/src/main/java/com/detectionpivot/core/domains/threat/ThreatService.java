package com.detectionpivot.core.domains.threat;

import com.detectionpivot.core.domains.session.SessionService;
import com.detectionpivot.core.domains.threat.dto.CreateThreatRequest;
import com.detectionpivot.core.domains.threat.dto.ThreatInfoDto;
import com.detectionpivot.core.exceptions.custom.IdNotFoundException;
import com.detectionpivot.data.domains.threat.ThreatRepository;
import com.detectionpivot.data.domains.threat.model.Threat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ThreatService {

	private final ThreatRepository threatRepository;

	private final SessionService sessionService;

	@Lazy
	@Autowired
	public ThreatService(ThreatRepository threatRepository, SessionService sessionService) {
		this.threatRepository = threatRepository;
		this.sessionService = sessionService;
	}

	public boolean createThreat(CreateThreatRequest createThreatRequest) {
		Threat threat = new Threat();
		threat.setTitle(createThreatRequest.getTitle());
		threat.setMacsSrc(createThreatRequest.getMacsSrc());
		threat.setMacsDst(createThreatRequest.getMacsDst());
		threat.setIpsSrc(createThreatRequest.getIpsSrc());
		threat.setIpsDst(createThreatRequest.getIpsDst());
		threat.setProtocol(createThreatRequest.getProtocol());
		threat.setPortsSrc(createThreatRequest.getPortsSrc());
		threat.setPortsDst(createThreatRequest.getPortsDst());
		threat.setPayload(createThreatRequest.getPayload());

		threatRepository.save(threat);
		return true;
	}

	public List<ThreatInfoDto> getAllThreats(Integer from, Integer count, Principal principal) {
		var pageable = PageRequest.of(from / count, count);
		var foundThreats = threatRepository.getAllThreats(pageable);
		return foundThreats.stream().map(ThreatMapper.MAPPER::threatToThreatInfoDto).collect(Collectors.toList());
	}

	public List<ThreatInfoDto> getAllThreatsToSession(UUID sessionId, Integer from, Integer count, Principal principal) {
		var pageable = PageRequest.of(from / count, count);
		var foundThreats = threatRepository.getAllThreats(pageable);
		var foundSession = sessionService.getSessionById(sessionId);

		var threats = foundThreats.stream().map(ThreatMapper.MAPPER::threatToThreatInfoDto).collect(Collectors.toList());

		// change threat state to Active if it exists in current session
		threats.stream().filter((threat) -> {
			return foundSession.getThreats().stream().anyMatch(foundThreat -> threat.getId().equals(foundThreat.getId()));
		}).forEach(threat -> threat.setActive(true));

		return threats;
	}

	public Threat getThreatById(UUID threatId) {
		return threatRepository.findById(threatId)
			.orElseThrow(() -> new IdNotFoundException("Threat with id : " + threatId + " not found."));
	}

	public UUID deleteThreatById(UUID threatId) {
		threatRepository.deleteFromSessions(threatId);
		threatRepository.deleteById(threatId);
		return threatId;
	}

}
