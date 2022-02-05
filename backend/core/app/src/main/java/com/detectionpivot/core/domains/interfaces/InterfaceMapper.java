package com.detectionpivot.core.domains.interfaces;

import com.detectionpivot.core.domains.interfaces.dto.InterfaceDataDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.pcap4j.core.PcapNetworkInterface;

@Mapper
public interface InterfaceMapper {
	InterfaceMapper MAPPER = Mappers.getMapper(InterfaceMapper.class);

	InterfaceDataDto fromPcapNetworkInterfaceToInterfaceDataDto(PcapNetworkInterface pcapNetworkInterface);
}
