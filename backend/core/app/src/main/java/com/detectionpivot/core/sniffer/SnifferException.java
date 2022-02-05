package com.detectionpivot.core.sniffer;

import lombok.Getter;

@Getter
public class SnifferException extends RuntimeException {

	private final String code;

	public SnifferException(String message, String code) {
		super(message);
		this.code = code;
	}
}
