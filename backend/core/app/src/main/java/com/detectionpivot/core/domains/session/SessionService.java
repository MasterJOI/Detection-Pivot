package com.detectionpivot.core.domains.session;

import com.detectionpivot.core.domains.packet.PacketMapper;
import com.detectionpivot.core.domains.session.dto.AddRemoveThreatDto;
import com.detectionpivot.core.domains.session.dto.RequestSessionDto;
import com.detectionpivot.core.domains.session.dto.ResponseSessionDto;
import com.detectionpivot.core.domains.session.dto.SessionInfoDto;
import com.detectionpivot.core.domains.threat.ThreatService;
import com.detectionpivot.core.exceptions.custom.IdNotFoundException;
import com.detectionpivot.core.sniffer.SnifferService;
import com.detectionpivot.data.domains.packet.PacketRepository;
import com.detectionpivot.data.domains.packet.model.Packet;
import com.detectionpivot.data.domains.session.SessionRepository;
import com.detectionpivot.data.domains.session.model.Session;
import com.detectionpivot.data.domains.threat.model.Threat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class SessionService {

	private final SessionRepository sessionRepository;

	private final PacketRepository packetRepository;

	private final SnifferService snifferService;

	private final ThreatService threatService;

	@Lazy
	@Autowired
	public SessionService(
		SessionRepository sessionRepository,
		PacketRepository packetRepository, SnifferService snifferService, ThreatService threatService) {
		this.sessionRepository = sessionRepository;
		this.packetRepository = packetRepository;
		this.snifferService = snifferService;
		this.threatService = threatService;
	}

	public Session getSessionById(UUID sessionId) {
		return sessionRepository.findById(sessionId)
			.orElseThrow(() -> new IdNotFoundException("Session with id : " + sessionId + " not found."));
	}

	public ResponseSessionDto saveSession(RequestSessionDto requestSessionDto) {
		Session session = new Session();
		session.setInterfaceName(requestSessionDto.getInterfaceName());
		session.setInterfaceDescription(requestSessionDto.getInterfaceDescription());
		session.setState(Session.State.open);
		var savedSession = sessionRepository.save(session);

		return SessionMapper.MAPPER.sessionToResponseSessionDto(savedSession);
	}

	public ResponseSessionDto getResponseSessionById(UUID sessionId) {
		var foundSession = getSessionById(sessionId);
		var session = SessionMapper.MAPPER.sessionToResponseSessionDto(foundSession);
		List<Packet> packetsList = packetRepository.getAllBySessionId(sessionId);
		session.setPackets(packetsList.stream().map(PacketMapper.MAPPER::packetToTablePacketDto).collect(Collectors.toList()));

		return session;
	}

	public boolean updateSessionSnifferState(Session session, boolean snifferState) {
		session.setSnifferOn(snifferState);
		sessionRepository.save(session);

		/* var session = SessionMapper.MAPPER.sessionToResponseSessionDto(foundSession);
		List<Packet> packetsList = packetRepository.getAllBySessionId(sessionId);

		session.setPackets(packetsList.stream().map(PacketMapper.MAPPER::packetToTablePacketDto).collect(Collectors.toList()));*/
		return snifferState;
	}

	public void closeSession(UUID sessionId) {
			// change session state to closed
			sessionRepository.setSessionClosed(sessionId);
			// stop sniffer in ever state
			snifferService.toggleSnifferState(false, sessionId);
	}

    public List<SessionInfoDto> getAllSessions(Integer from, Integer count, Principal principal) {
		var pageable = PageRequest.of(from / count, count);
		var foundSessions = sessionRepository.getAllSessions(pageable);
		return foundSessions.stream().map(SessionMapper.MAPPER::sessionToSessionInfoDto).collect(Collectors.toList());
    }

	public UUID addThreatToSession(AddRemoveThreatDto addRemoveThreatDto) {
		var foundSession = getSessionById(addRemoveThreatDto.getSessionId());
		Set<Threat> threatSet = foundSession.getThreats();
		threatSet.add(threatService.getThreatById(addRemoveThreatDto.getThreatId()));
		foundSession.setThreats(threatSet);
		sessionRepository.save(foundSession);
		return addRemoveThreatDto.getThreatId();
	}

	public UUID removeThreatFromSession(AddRemoveThreatDto addRemoveThreatDto) {
		var foundSession = getSessionById(addRemoveThreatDto.getSessionId());
		Set<Threat> threatSet = foundSession.getThreats();
		threatSet.remove(threatService.getThreatById(addRemoveThreatDto.getThreatId()));
		foundSession.setThreats(threatSet);
		sessionRepository.save(foundSession);
		return addRemoveThreatDto.getThreatId();
	}

	public UUID deleteSessionById(UUID sessionId) {
		var foundSession = getSessionById(sessionId);
		packetRepository.deleteAllBySession(foundSession);
		sessionRepository.delete(foundSession);
		return foundSession.getId();
	}
}
