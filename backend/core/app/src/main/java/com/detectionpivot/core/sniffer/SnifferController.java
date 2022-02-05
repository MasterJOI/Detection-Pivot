package com.detectionpivot.core.sniffer;

import com.detectionpivot.core.domains.session.dto.ResponseSessionDto;
import com.detectionpivot.core.sniffer.dto.ToggleStateDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("sniffer")
@Validated
public class SnifferController {

	private final SnifferService snifferService;

	@Autowired
	public SnifferController(SnifferService snifferService) {
		this.snifferService = snifferService;
	}

	@PostMapping("/toggle-state")
	public boolean toggleSnifferState(@RequestBody ToggleStateDto toggleStateDto) {
		System.out.println(toggleStateDto);
		return snifferService.toggleSnifferState(toggleStateDto.getIsSnifferOn(), toggleStateDto.getSessionId());
	}

}
