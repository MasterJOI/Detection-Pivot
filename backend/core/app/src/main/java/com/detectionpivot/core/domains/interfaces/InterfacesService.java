package com.detectionpivot.core.domains.interfaces;

import com.detectionpivot.core.sniffer.SnifferException;
import com.detectionpivot.core.domains.interfaces.dto.InterfaceDataDto;
import org.jnetpcap.PcapIf;
import org.jnetpcap.Pcap;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InterfacesService {

	public List<InterfaceDataDto> getAllInterfaces() {
		List<PcapIf> allDevs = new ArrayList<>();
		StringBuilder errBuf = new StringBuilder();

		int r = Pcap.findAllDevs(allDevs, errBuf);
		if (r != Pcap.OK || allDevs.isEmpty()) {
			throw new SnifferException("Can't read list of devices, error is: " + errBuf, "sniffer-pcap");
		}

		return allDevs.stream()
			.map(InterfaceMapper.MAPPER::fromPcapIfToInterfaceDataDto)
			.collect(Collectors.toList());
	}
}
