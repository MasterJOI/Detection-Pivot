package com.detectionpivot.core.sniffer.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckForm {

	private boolean isMacSrc;

	private boolean isMacDst;

	private boolean isIpSrc;

	private boolean isIpDst;

	private boolean isProtocol;

	private boolean isPortSrc;

	private boolean isPortDst;

	private boolean isPayload;

	public CheckForm() {
		this.isMacSrc = false;
		this.isMacDst = false;
		this.isIpSrc = false;
		this.isIpDst = false;
		this.isProtocol = false;
		this.isPortSrc = false;
		this.isPortDst = false;
		this.isPayload = false;
	}

	public void setFalse() {
		this.setMacSrc(false);
		this.setMacDst(false);
		this.setIpSrc(false);
		this.setIpSrc(false);
		this.setProtocol(false);
		this.setPortSrc(false);
		this.setPortDst(false);
		this.setPayload(false);
	}
}
