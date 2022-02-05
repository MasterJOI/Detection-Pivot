package com.detectionpivot.core.domains.threat;

import com.detectionpivot.core.domains.threat.dto.CreateThreatRequest;
import com.detectionpivot.core.domains.threat.dto.ThreatInfoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/threat")
@Validated
public class ThreatController {

	private final ThreatService threatService;

	@Autowired
	public ThreatController(ThreatService threatService) {
		this.threatService = threatService;
	}

	@PostMapping("/create")
	public boolean createThreat(@Valid @RequestBody CreateThreatRequest createThreatRequest) {
		return threatService.createThreat(createThreatRequest);
	}

	@GetMapping("/get-list/all")
	public List<ThreatInfoDto> getAllThreats(@RequestParam(defaultValue = "0") Integer from,
											 @RequestParam(defaultValue = "10") Integer count, Principal principal) {
		return threatService.getAllThreats(from, count, principal);
	}

	@GetMapping("/get-list/{sessionId}")
	public List<ThreatInfoDto> getAllThreats(@PathVariable UUID sessionId,
											 @RequestParam(defaultValue = "0") Integer from,
											 @RequestParam(defaultValue = "10") Integer count, Principal principal) {
		return threatService.getAllThreatsToSession(sessionId, from, count, principal);
	}

	@DeleteMapping("/delete/{id}")
	public UUID deleteThreatById(@PathVariable UUID id) {
		return threatService.deleteThreatById(id);
	}
}
