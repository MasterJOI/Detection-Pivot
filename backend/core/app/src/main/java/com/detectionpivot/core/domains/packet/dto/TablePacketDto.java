package com.detectionpivot.core.domains.packet.dto;

import lombok.Data;

import java.sql.Timestamp;
import java.util.UUID;

@Data
public class TablePacketDto {

	private UUID id;

	private Timestamp interceptedAt;

	private String macSrc;

	private String macDst;

	private String ipSrc;

	private String ipDst;

	private String protocol;

	private String portSrc;

	private String portDst;

	private boolean suspicious;

}
