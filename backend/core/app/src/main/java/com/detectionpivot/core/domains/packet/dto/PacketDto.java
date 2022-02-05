package com.detectionpivot.core.domains.packet.dto;

import com.detectionpivot.data.domains.threat.model.Threat;
import lombok.Data;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class PacketDto {

	private UUID id;

	private UUID sessionId;

	private Timestamp interceptedAt;

	private String macSrc;

	private String macDst;

	private String ipSrc;

	private String ipDst;

	private String protocol;

	private String portSrc;

	private String portDst;

	private String payload;

	private boolean suspicious;

	private List<Threat> threatList = new ArrayList<>();

	/* public static PacketDto fromEntity(Packet packet) {
		return PacketDto.builder()
			.id(packet.getId())
			.sessionId(packet.getSession().getId())
			.interceptedAt(packet.getInterceptedAt())
			.macSrc(packet.getMacSrc())
			.macDst(packet.getMacDst())
			.ipSrc(packet.getIpSrc())
			.ipDst(packet.getIpDst())
			.protocol(packet.getProtocol())
			.portSrc(packet.getPortSrc())
			.portDst(packet.getPortDst())
			.payload(packet.getPayload())
			.build();
	}*/

}
