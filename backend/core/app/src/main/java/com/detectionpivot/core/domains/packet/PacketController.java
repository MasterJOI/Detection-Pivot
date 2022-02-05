package com.detectionpivot.core.domains.packet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/packet")
@Validated
public class PacketController {

	private final PacketService packetService;

	@Autowired
	public PacketController(PacketService packetService) {
		this.packetService = packetService;
	}

}
