package com.detectionpivot.data.domains.session.model;

import com.detectionpivot.data.domains.threat.model.Threat;
import com.detectionpivot.data.model.BaseAuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "sessions")
@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class Session extends BaseAuditableEntity {

	public static enum State {

		open, closed, paused

	}

	@Enumerated(EnumType.STRING)
	private State state;

	@Column(name = "interface_name", nullable = false)
	private String interfaceName;

	@Column(name = "interface_description", nullable = false)
	private String interfaceDescription;

	@Column(name = "is_sniffer_on", nullable = false)
	private boolean isSnifferOn;

	@ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinTable(name = "session2threat", joinColumns = @JoinColumn(name = "session_id"),
		inverseJoinColumns = @JoinColumn(name = "threat_id"))
	private Set<Threat> threats = new HashSet<>();

	@Override
	public String toString() {
		return "Session{" +
			"state=" + state +
			", interfaceName='" + interfaceName + '\'' +
			", interfaceDescription='" + interfaceDescription + '\'' +
			", isSnifferOn=" + isSnifferOn +
			'}';
	}
}
