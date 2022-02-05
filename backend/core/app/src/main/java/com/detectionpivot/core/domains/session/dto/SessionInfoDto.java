package com.detectionpivot.core.domains.session.dto;

import com.detectionpivot.data.domains.session.model.Session;
import lombok.Data;

import java.sql.Timestamp;
import java.util.UUID;

@Data
public class SessionInfoDto {

	private UUID id;

	private Timestamp createdAt;

	private Session.State state;

	private String interfaceName;

	private String interfaceDescription;
}
