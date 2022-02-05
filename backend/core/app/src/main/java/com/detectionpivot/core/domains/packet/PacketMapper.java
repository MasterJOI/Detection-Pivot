package com.detectionpivot.core.domains.packet;

import com.detectionpivot.core.domains.packet.dto.PacketDto;
import com.detectionpivot.core.domains.packet.dto.TablePacketDto;
import com.detectionpivot.data.domains.packet.model.Packet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PacketMapper {

	PacketMapper MAPPER = Mappers.getMapper(PacketMapper.class);

	@Mapping(source = "sessionId", target = "session.id")
	Packet packetDtoToPacket(PacketDto packetDto);

	@Mapping(source = "session.id", target = "sessionId")
	PacketDto packetToPacketDto(Packet packet);

	TablePacketDto packetDtoToTablePacketDto(PacketDto packetDto);

	TablePacketDto packetToTablePacketDto(Packet packet);

}
