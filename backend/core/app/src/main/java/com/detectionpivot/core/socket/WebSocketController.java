package com.detectionpivot.core.socket;

import com.detectionpivot.core.domains.packet.dto.PacketDto;
import com.detectionpivot.core.domains.packet.dto.TablePacketDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class WebSocketController {

	@Autowired
	SimpMessagingTemplate template;

	@PostMapping("/send")
	public ResponseEntity<Void> sendMessage(@RequestBody TablePacketDto packetDto) {
		template.convertAndSend("/topic/packet", packetDto);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@SendTo("/topic/packet")
	public PacketDto broadcastMessage(@Payload PacketDto packetDto) {
		return packetDto;
	}
}
