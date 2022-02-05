package com.detectionpivot.core.domains.session;

import com.detectionpivot.core.domains.session.dto.ResponseSessionDto;
import com.detectionpivot.core.domains.session.dto.SessionInfoDto;
import com.detectionpivot.data.domains.session.model.Session;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface SessionMapper {

	SessionMapper MAPPER = Mappers.getMapper(SessionMapper.class);

	ResponseSessionDto sessionToResponseSessionDto(Session session);

	SessionInfoDto sessionToSessionInfoDto(Session session);
}
