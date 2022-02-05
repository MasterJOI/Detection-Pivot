package com.detectionpivot.core.domains.session.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class AddRemoveThreatDto {

	private UUID sessionId;

	private UUID threatId;
}
