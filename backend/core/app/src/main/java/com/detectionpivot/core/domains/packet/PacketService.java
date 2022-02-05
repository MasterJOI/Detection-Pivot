package com.detectionpivot.core.domains.packet;

import com.detectionpivot.core.domains.packet.dto.PacketDto;
import com.detectionpivot.data.domains.packet.PacketRepository;
import com.detectionpivot.data.domains.packet.model.Packet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
public class PacketService {

	private final PacketRepository packetRepository;

	@Lazy
	@Autowired
	public PacketService(
		PacketRepository packetRepository
	) {
		this.packetRepository = packetRepository;
	}

	public void savePacket(PacketDto capturedPacket) {
		Packet packet = PacketMapper.MAPPER.packetDtoToPacket(capturedPacket);
		packetRepository.save(packet);
	}
}
