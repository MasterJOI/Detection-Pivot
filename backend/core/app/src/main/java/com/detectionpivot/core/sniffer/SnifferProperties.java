package com.detectionpivot.core.sniffer;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@ConfigurationProperties(prefix = "sniffer")
@Configuration
public class SnifferProperties {

	private int count;

	private int read_timeout;

	private int snaplen;
}
