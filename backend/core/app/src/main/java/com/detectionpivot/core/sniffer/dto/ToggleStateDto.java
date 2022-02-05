package com.detectionpivot.core.sniffer.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class ToggleStateDto {

	private Boolean isSnifferOn;

	private UUID sessionId;
}
