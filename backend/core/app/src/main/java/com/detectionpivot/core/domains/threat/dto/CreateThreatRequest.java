package com.detectionpivot.core.domains.threat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
public class CreateThreatRequest {

	@NotNull
	private String title;

	private String macsSrc;

	private String macsDst;

	private String ipsSrc;

	private String ipsDst;

	private String protocol;

	private String portsSrc;

	private String portsDst;

	private String payload;
}
