package com.detectionpivot.data.domains.packet;

import com.detectionpivot.data.domains.packet.model.Packet;
import com.detectionpivot.data.domains.session.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

public interface PacketRepository extends JpaRepository<Packet, UUID>, JpaSpecificationExecutor<Packet> {

	List<Packet> getAllBySessionId(UUID id);

	@Transactional
	@Modifying
	@Query("DELETE FROM Packet p where p.session = :foundSession")
	void deleteAllBySession(Session foundSession);
}
