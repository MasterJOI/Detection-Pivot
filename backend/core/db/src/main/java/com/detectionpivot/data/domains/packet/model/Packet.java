package com.detectionpivot.data.domains.packet.model;

import com.detectionpivot.data.domains.session.model.Session;
import com.detectionpivot.data.domains.threat.model.Threat;
import com.detectionpivot.data.model.BaseAuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "packets")
@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class Packet extends BaseAuditableEntity {

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "session_id")
	private Session session;

	@Column(name = "intercepted_at", nullable = false)
	private Date interceptedAt;

	@Column(name = "mac_src", nullable = false)
	private String macSrc;

	@Column(name = "mac_dst", nullable = false)
	private String macDst;

	@Column(name = "ip_src", nullable = false)
	private String ipSrc;

	@Column(name = "ip_dst", nullable = false)
	private String ipDst;

	@Column(name = "protocol", nullable = false)
	private String protocol;

	@Column(name = "port_src", nullable = false)
	private String portSrc;

	@Column(name = "port_dst", nullable = false)
	private String portDst;

	private String payload;

	@ManyToMany(mappedBy = "packets", cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	private Set<Threat> threads = new HashSet<>();

	@Override
	public String toString() {
		return "Packet{" +
			"session=" + session +
			", interceptedAt=" + interceptedAt +
			", macSrc='" + macSrc + '\'' +
			", macDst='" + macDst + '\'' +
			", ipSrc='" + ipSrc + '\'' +
			", ipDst='" + ipDst + '\'' +
			", protocol='" + protocol + '\'' +
			", portSrc='" + portSrc + '\'' +
			", portDst='" + portDst + '\'' +
			", payload='" + payload + '\'' +
			", threads=" + threads +
			'}';
	}
}
