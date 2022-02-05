package com.detectionpivot.core.domains.session.dto;

import com.detectionpivot.core.domains.packet.dto.TablePacketDto;
import com.detectionpivot.data.domains.session.model.Session;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Data
public class ResponseSessionDto {

	private UUID id;

	private Timestamp createdAt;

	private Session.State state;

	private String interfaceName;

	private String interfaceDescription;

	private boolean isSnifferOn;

	private List<TablePacketDto> packets;

}
