package com.detectionpivot.core.domains.threat;

import com.detectionpivot.core.domains.threat.dto.ThreatInfoDto;
import com.detectionpivot.data.domains.threat.model.Threat;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ThreatMapper {

	ThreatMapper MAPPER = Mappers.getMapper(ThreatMapper.class);

	ThreatInfoDto threatToThreatInfoDto(Threat threat);

}
