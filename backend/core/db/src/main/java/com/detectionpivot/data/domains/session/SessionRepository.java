package com.detectionpivot.data.domains.session;

import com.detectionpivot.data.domains.session.model.Session;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

public interface SessionRepository extends JpaRepository<Session, UUID>, JpaSpecificationExecutor<Session> {

	@Transactional
	@Modifying
	@Query("update Session s set s.state = 'closed' where s.id = :id")
    void setSessionClosed(@Param("id") UUID id);

	@Query("SELECT s from Session s where s.deleted = false order by s.createdAt desc")
	List<Session> getAllSessions(PageRequest pageable);
}
