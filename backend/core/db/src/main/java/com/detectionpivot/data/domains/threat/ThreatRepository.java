package com.detectionpivot.data.domains.threat;

import com.detectionpivot.data.domains.threat.model.Threat;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

public interface ThreatRepository extends JpaRepository<Threat, UUID>, JpaSpecificationExecutor<Threat> {

	@Query("SELECT t from Threat t where t.deleted = false order by t.createdAt desc")
	List<Threat> getAllThreats(PageRequest pageable);

	@Transactional
	@Modifying
	@Query(value = "Delete from session2threat where threat_id = :id", nativeQuery = true)
    void deleteFromSessions(UUID id);
}
