package com.detectionpivot.core.domains.interfaces;

import com.detectionpivot.core.sniffer.SnifferException;
import com.detectionpivot.core.domains.interfaces.dto.InterfaceDataDto;
import org.pcap4j.core.PcapNativeException;
import org.pcap4j.core.PcapNetworkInterface;
import org.pcap4j.core.Pcaps;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InterfacesService {

	public List<InterfaceDataDto> getAllInterfaces() {
		try {
			List<PcapNetworkInterface> interfaces = Pcaps.findAllDevs();
			return interfaces.stream()
					.map(InterfaceMapper.MAPPER::fromPcapNetworkInterfaceToInterfaceDataDto)
					.collect(Collectors.toList());
		} catch (PcapNativeException e) {
			throw new SnifferException("An error occurs in the pcap native library", "sniffer-pcap");
		}
	}
}
