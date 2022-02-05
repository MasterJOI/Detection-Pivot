package com.detectionpivot.core.domains.threat.dto;

import com.detectionpivot.data.domains.session.model.Session;
import lombok.Data;

import java.sql.Timestamp;
import java.util.UUID;

@Data
public class ThreatInfoDto {

	private UUID id;

	private Timestamp createdAt;

	private boolean isActive;

	private String title;

}
