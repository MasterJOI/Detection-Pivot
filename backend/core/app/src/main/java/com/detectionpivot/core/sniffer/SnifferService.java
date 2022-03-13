package com.detectionpivot.core.sniffer;

import com.detectionpivot.core.domains.session.SessionService;
import com.detectionpivot.core.domains.session.dto.ResponseSessionDto;
import com.detectionpivot.data.domains.session.model.Session;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
public class SnifferService {

	private final SnifferProvider snifferProvider;

	private final SessionService sessionService;

	@Autowired
	public SnifferService(SnifferProvider snifferProvider, SessionService sessionService) {
		this.snifferProvider = snifferProvider;
		this.sessionService = sessionService;
	}

	public boolean toggleSnifferState(Boolean state, UUID sessionId) {
		Session currentSession = sessionService.getSessionById(sessionId);
		if (state) {
			snifferProvider.runSniffer(currentSession.getInterfaceName());
			snifferProvider.sniff(currentSession.getId(), currentSession.getThreats());
		} else {
			if (currentSession.isSnifferOn()) {
				snifferProvider.stopSniffer();
			}
		}

		return sessionService.updateSessionSnifferState(currentSession, state);
	}

}
