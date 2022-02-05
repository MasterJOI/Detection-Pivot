package com.detectionpivot.data.domains.threat.model;

import com.detectionpivot.data.domains.packet.model.Packet;
import com.detectionpivot.data.domains.session.model.Session;
import com.detectionpivot.data.model.BaseAuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "threats")
@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class Threat extends BaseAuditableEntity {

	@Column(name = "title", nullable = false)
	private String title;

	@Column(name = "macs_src")
	private String macsSrc;

	@Column(name = "macs_dst")
	private String macsDst;

	@Column(name = "ips_src")
	private String ipsSrc;

	@Column(name = "ips_dst")
	private String ipsDst;

	private String protocol;

	@Column(name = "ports_src")
	private String portsSrc;

	@Column(name = "ports_dst")
	private String portsDst;

	private String payload;

	@ManyToMany(mappedBy = "threats", cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	private Set<Session> sessions = new HashSet<>();

	@ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinTable(name = "threat2packet", joinColumns = @JoinColumn(name = "threat_id"),
		inverseJoinColumns = @JoinColumn(name = "packet_id"))
	private Set<Packet> packets = new HashSet<>();

	@Override
	public String toString() {
		return "Threat{" +
			"title='" + title + '\'' +
			", macsSrc=" + macsSrc +
			", macsDst=" + macsDst +
			", ipsSrc=" + ipsSrc +
			", ipsDst=" + ipsDst +
			", protocol='" + protocol + '\'' +
			", portsSrc=" + portsSrc +
			", portsDst=" + portsDst +
			", payload='" + payload + '\'' +
			'}';
	}
}
