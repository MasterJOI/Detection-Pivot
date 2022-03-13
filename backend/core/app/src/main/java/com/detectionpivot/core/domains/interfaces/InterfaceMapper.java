package com.detectionpivot.core.domains.interfaces;

import com.detectionpivot.core.domains.interfaces.dto.InterfaceDataDto;
import org.jnetpcap.PcapIf;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface InterfaceMapper {
	InterfaceMapper MAPPER = Mappers.getMapper(InterfaceMapper.class);

	InterfaceDataDto fromPcapIfToInterfaceDataDto(PcapIf pcapIf);
}
