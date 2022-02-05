package com.detectionpivot.core.domains.session;

import com.detectionpivot.core.domains.session.dto.AddRemoveThreatDto;
import com.detectionpivot.core.domains.session.dto.RequestSessionDto;
import com.detectionpivot.core.domains.session.dto.ResponseSessionDto;
import com.detectionpivot.core.domains.session.dto.SessionInfoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/session")
@Validated
public class SessionController {

	private final SessionService sessionService;

	@Autowired
	public SessionController(SessionService sessionService) {
		this.sessionService = sessionService;
	}

	@PostMapping("/create")
	public ResponseSessionDto createNewSession(@RequestBody RequestSessionDto requestSessionDto) {
		return sessionService.saveSession(requestSessionDto);
	}

	@GetMapping("/{id}")
	public ResponseSessionDto getSessionById(@PathVariable UUID id) {
		return sessionService.getResponseSessionById(id);
	}

	@PostMapping("/close/{id}")
	public ResponseEntity<?> closeSession(@PathVariable UUID id) {
		sessionService.closeSession(id);
		return ResponseEntity.status(200).build();
	}

	@GetMapping("/all")
	public List<SessionInfoDto> getAllSessions(@RequestParam(defaultValue = "0") Integer from,
												@RequestParam(defaultValue = "10") Integer count, Principal principal) {
		return sessionService.getAllSessions(from, count, principal);
	}

	@PostMapping("/add-threat")
	public UUID addThreatToSession(@RequestBody AddRemoveThreatDto addRemoveThreatDto) {
		return sessionService.addThreatToSession(addRemoveThreatDto);
	}

	@PostMapping("/remove-threat")
	public UUID removeThreatFromSession(@RequestBody AddRemoveThreatDto addRemoveThreatDto) {
		return sessionService.removeThreatFromSession(addRemoveThreatDto);
	}

	@DeleteMapping("/delete/{id}")
	public UUID deleteSessionById(@PathVariable UUID id) {
		return sessionService.deleteSessionById(id);
	}
}
