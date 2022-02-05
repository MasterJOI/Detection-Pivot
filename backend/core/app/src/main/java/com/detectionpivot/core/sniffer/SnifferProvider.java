package com.detectionpivot.core.sniffer;

import com.detectionpivot.core.domains.packet.PacketMapper;
import com.detectionpivot.core.domains.packet.PacketService;
import com.detectionpivot.core.domains.packet.dto.PacketDto;
import com.detectionpivot.core.domains.packet.dto.TablePacketDto;
import com.detectionpivot.core.sniffer.dto.CheckForm;
import com.detectionpivot.core.socket.WebSocketController;
import com.detectionpivot.data.domains.threat.model.Threat;
import org.pcap4j.core.*;
import org.pcap4j.core.PcapNetworkInterface.PromiscuousMode;
import org.pcap4j.packet.*;
import org.pcap4j.packet.namednumber.DnsResourceRecordType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.net.InetAddress;
import java.util.*;

@Component
public class SnifferProvider {

	private final SnifferProperties snifferProperties;

	private final WebSocketController webSocketController;

	private final PacketService packetService;

	private PcapHandle pcapHandle = null;

	private final Map<DnsDomainName, List<String>> dnsMap = new HashMap<>();

	@Autowired
	public SnifferProvider(SnifferProperties snifferProperties, WebSocketController webSocketController, PacketService packetService) {
		this.snifferProperties = snifferProperties;
		this.webSocketController = webSocketController;
		this.packetService = packetService;
	}

	public void runSniffer(String interfaceName) {

		PcapNetworkInterface nif;
		String filter = "";

		try {
			nif = Pcaps.getDevByName(interfaceName);

			System.out.println(nif.getName() + "(" + nif.getDescription() + ")");

			pcapHandle = nif.openLive(snifferProperties.getSnaplen(),
				PromiscuousMode.PROMISCUOUS,
				snifferProperties.getRead_timeout());

			pcapHandle.setFilter(filter, BpfProgram.BpfCompileMode.OPTIMIZE);

		} catch (PcapNativeException pcapEx) {
			throw new SnifferException("An error occurs in the pcap native library", "sniffer-pcap");
		} catch (NotOpenException e) {
			throw new SnifferException("PcapHandle not open!", "pcap-handle-off");
		}
	}

	@Async
	public void sniff(UUID currentSessionId, Set<Threat> threatSet) {
		int count = 0;
		CheckForm checkForm = new CheckForm();
		while (pcapHandle.isOpen()) {
			try {
				Packet packet = pcapHandle.getNextPacket();
				if (packet == null) continue;
				PacketDto packetDto = getNextPacketDto(packet, count, currentSessionId);

				// check for threats
				if (threatSet != null) {
					threatSet.stream().filter(threat -> checkThreat(threat, packetDto, checkForm))
						.forEach(threat -> {
							packetDto.getThreatList().add(threat);
							packetDto.setSuspicious(true);
						});
					checkForm.setFalse();
				}

				// save packet to the db
				packetService.savePacket(packetDto);

				//map and send packet
				webSocketController.sendMessage(PacketMapper.MAPPER.packetDtoToTablePacketDto(packetDto));
				count++;
				if (count >= snifferProperties.getCount()) {
					break;
				}
			} catch (NotOpenException e) {
				throw new SnifferException("PcapHandle not open!", "pcap-handle-off");
			}
		}
	}

	public boolean checkThreat(Threat threat, PacketDto packetDto, CheckForm checkForm) {

		if(!threat.getMacsSrc().isEmpty()) {
			checkForm.setMacSrc(Arrays.asList(threat.getMacsSrc()
				.split("~")).contains(packetDto.getMacSrc()));
		}

		if(!threat.getMacsDst().isEmpty()) {
			checkForm.setMacDst(Arrays.asList(threat.getMacsDst()
				.split("~")).contains(packetDto.getMacDst()));
		}

		if(!threat.getIpsSrc().isEmpty()) {
			checkForm.setIpSrc(Arrays.asList(threat.getIpsSrc()
				.split("~")).contains(packetDto.getIpSrc()));
		}

		if(!threat.getIpsDst().isEmpty()) {
			checkForm.setIpDst(Arrays.asList(threat.getIpsDst()
				.split("~")).contains(packetDto.getIpDst()));
		}

		if(!threat.getIpsSrc().isEmpty()) {
			checkForm.setIpSrc(Arrays.asList(threat.getIpsSrc()
				.split("~")).contains(packetDto.getIpSrc()));
		}

		if(!threat.getProtocol().isEmpty()) {
			checkForm.setProtocol(packetDto.getProtocol().contains(threat.getProtocol()));
		}

		if(!threat.getPortsSrc().isEmpty()) {
			checkForm.setPortSrc(Arrays.asList(threat.getPortsSrc()
				.split("~")).contains(packetDto.getPortSrc()));
		}

		if(!threat.getPortsDst().isEmpty()) {
			checkForm.setPortDst(Arrays.asList(threat.getPortsDst()
				.split("~")).contains(packetDto.getPortDst()));
		}

		if(!threat.getPayload().isEmpty()) {
			checkForm.setPayload(packetDto.getPayload().contains(threat.getPayload()));
		}

		return checkForm.isMacSrc() || checkForm.isMacDst() || checkForm.isIpSrc()
		|| checkForm.isIpDst() || checkForm.isProtocol() || checkForm.isPortSrc()
		|| checkForm.isPortDst() || checkForm.isPayload();
	}

	private PacketDto getNextPacketDto(Packet packet, int count, UUID sessionId) {

		// unpacking
		EthernetPacket ethernetPacket = packet.get(EthernetPacket.class);
		IpV4Packet ipV4Packet = packet.get(IpV4Packet.class);
		// DnsPacket dnsPacket = ipV4Packet.get(DnsPacket.class);
		TcpPacket tcpPacket = packet.get(TcpPacket.class);
		UdpPacket udpPacket = packet.get(UdpPacket.class);

		// get ip`s and ports
		InetAddress srcIp = ipV4Packet.getHeader().getSrcAddr();
		InetAddress destIp = ipV4Packet.getHeader().getDstAddr();
		String srcPort = tcpPacket != null ? String.valueOf(tcpPacket.getHeader().getSrcPort().valueAsInt())
			: String.valueOf(udpPacket.getHeader().getSrcPort().valueAsInt());
		String dstPort = tcpPacket != null ? String.valueOf(tcpPacket.getHeader().getDstPort().valueAsInt())
			: String.valueOf(udpPacket.getHeader().getDstPort().valueAsInt());

		//try to get dns name
		/*String dnsName = "unknown";

		 if (srcPort == 53) {
			Optional<DnsDomainName> dnsDomainName = Optional.ofNullable(dnsPacket.getHeader().getQuestions().get(0).getQName());
			List<String> dnsAdrList = getAddressesFromDnsPaket(dnsPacket);

			dnsDomainName.ifPresent(domainName -> dnsMap.put(domainName, dnsAdrList));
		} else if (srcIp.getHostAddress().equals(hostIp)) {
			dnsName = "The host itself";
		} else {
			Optional<DnsDomainName> optionalDns = dnsMap.entrySet().stream()
				.filter(e -> e.getValue().contains(srcIp.getHostAddress()))
				.map(Map.Entry::getKey)
				.findFirst();
			if (optionalDns.isPresent()) {
				dnsName = optionalDns.get().getName();
			} else {
				dnsName = srcIp.getHostName();
			}
		}*/

		//building packetDto
		PacketDto packetDto = new PacketDto();
		packetDto.setSessionId(sessionId);
		packetDto.setInterceptedAt(pcapHandle.getTimestamp());
		packetDto.setMacSrc(ethernetPacket.getHeader().getSrcAddr().toString());
		packetDto.setMacDst(ethernetPacket.getHeader().getDstAddr().toString());
		packetDto.setIpSrc(srcIp.getHostAddress());
		packetDto.setIpDst(destIp.getHostAddress());
		packetDto.setProtocol(ipV4Packet.getHeader().getProtocol().toString());
		packetDto.setPortSrc(srcPort);
		packetDto.setPortDst(dstPort);
		// packetDto.setDnsName(dnsName);
		packetDto.setPayload("some info");

		return packetDto;
	}

	private static List<String> getAddressesFromDnsPaket(DnsPacket dnsPacket) {
		List<DnsResourceRecord> answerList = dnsPacket.getHeader().getAnswers();
		List<String> dnsAddresses = new ArrayList<>();
		for (DnsResourceRecord answer : answerList) {
			if (null != answer.getName()) {
				if (answer.getDataType().equals(DnsResourceRecordType.A)) {
					DnsResourceRecord.DnsRData rData = answer.getRData();
					String ipaddress = rData.toString();
					boolean isIPv4 = ipaddress.split("ADDRESS:")[1].indexOf(':') < 0;
					if (isIPv4) {
						String adr = ipaddress.split("ADDRESS: ")[1];
						dnsAddresses.add(adr.substring(0, adr.length() - 12));
					}
				}
			}
		}
		return dnsAddresses;
	}

	public void stopSniffer() {
		if (pcapHandle != null && pcapHandle.isOpen()) pcapHandle.close();
	}
}
