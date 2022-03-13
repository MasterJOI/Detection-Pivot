package com.detectionpivot.core.sniffer;

import com.detectionpivot.core.domains.packet.PacketMapper;
import com.detectionpivot.core.domains.packet.PacketService;
import com.detectionpivot.core.domains.packet.dto.PacketDto;
import com.detectionpivot.core.sniffer.dto.CheckForm;
import com.detectionpivot.core.socket.WebSocketController;
import com.detectionpivot.data.domains.threat.model.Threat;
import org.jnetpcap.Pcap;
import org.jnetpcap.PcapBpfProgram;
import org.jnetpcap.nio.JMemory;
import org.jnetpcap.packet.PcapPacket;
import org.jnetpcap.packet.PcapPacketHandler;
import org.jnetpcap.packet.format.FormatUtils;
import org.jnetpcap.protocol.lan.Ethernet;
import org.jnetpcap.protocol.network.Ip4;
import org.jnetpcap.protocol.tcpip.Http;
import org.jnetpcap.protocol.tcpip.Tcp;
import org.jnetpcap.protocol.tcpip.Udp;
import org.pcap4j.packet.*;
import org.pcap4j.packet.namednumber.DnsResourceRecordType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.net.InetAddress;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.*;

@Component
public class SnifferProvider {

	private final SnifferProperties snifferProperties;

	private final WebSocketController webSocketController;

	private final PacketService packetService;

	private static Pcap pcap;

	private final Map<DnsDomainName, List<String>> dnsMap = new HashMap<>();

	@Autowired
	public SnifferProvider(SnifferProperties snifferProperties, WebSocketController webSocketController, PacketService packetService) {
		this.snifferProperties = snifferProperties;
		this.webSocketController = webSocketController;
		this.packetService = packetService;
	}

	public void runSniffer(String interfaceName) {

		StringBuilder errbuf = new StringBuilder();

		pcap = Pcap.openLive(interfaceName,
			snifferProperties.getSnaplen(),
			Pcap.MODE_PROMISCUOUS,
			snifferProperties.getRead_timeout(),
			errbuf
		);

		if (pcap == null) {
			throw new SnifferException("Unable to open device for capture! Error: " + errbuf, "sniffer-pcap");
		}

		PcapBpfProgram program = new PcapBpfProgram();
		String expr = "";
		int optimize = 0;
		int netmask = 0xFFFFFF00;
		if (pcap.compile(program, expr, optimize, netmask) != Pcap.OK) {
			throw new SnifferException("Pcap: can't compile BPF. Error: " + errbuf, "sniffer-pcap");
		}
		if (pcap.setFilter(program) != Pcap.OK) {
			throw new SnifferException("Pcap: Can't set filter. Error: " + errbuf, "sniffer-pcap");
		}
	}

	@Async
	public void sniff(UUID currentSessionId, Set<Threat> threatSet) {

		/* PcapPacketHandler<String> jpacketHandler = new PcapPacketHandler<>() {

			public void nextPacket(PcapPacket pcapPacket, String user) {

				identifyPacket(pcapPacket, currentSessionId, threatSet);
			}
		};*/
		// pcap.loop(Pcap.LOOP_INFINITE, jpacketHandler, "");
		final PcapPacket packet = new PcapPacket(JMemory.POINTER);
		identifyPacket(packet, currentSessionId, threatSet);
	}

	public void identifyPacket(PcapPacket pcapPacket, UUID currentSessionId, Set<Threat> threatSet) {

		Ethernet eth = new Ethernet();
		Ip4 ip4 = new Ip4();
		Tcp tcp = new Tcp();
		Udp udp = new Udp();
		Http http = new Http();

		CheckForm checkForm = new CheckForm();

		while (pcap != null) {
			pcap.nextEx(pcapPacket);
			if (!pcapPacket.hasHeader(eth)) continue;

			PacketDto packetDto = new PacketDto();

			packetDto.setSessionId(currentSessionId);
			packetDto.setInterceptedAt(Timestamp.from(Instant.now()));
			if (pcapPacket.hasHeader(eth)) {
				packetDto.setMacSrc(FormatUtils.mac(eth.source()));
				packetDto.setMacDst(FormatUtils.mac(eth.destination()));

				if (pcapPacket.hasHeader(ip4)) {
					packetDto.setIpSrc(FormatUtils.ip(ip4.source()));
					packetDto.setIpDst(FormatUtils.ip(ip4.destination()));

					if (pcapPacket.hasHeader(tcp)) {
						packetDto.setProtocol("TCP");
						packetDto.setPortSrc(String.valueOf(tcp.source()));
						packetDto.setPortDst(String.valueOf(tcp.destination()));

						if (pcapPacket.hasHeader(http)) {

						}

					} else if (pcapPacket.hasHeader(udp)) {
						packetDto.setProtocol("UDP");
						packetDto.setPortSrc(String.valueOf(udp.source()));
						packetDto.setPortDst(String.valueOf(udp.destination()));
					}
				}
			}
			packetDto.setPayload("some info");

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
		}
	}

	public boolean checkThreat(Threat threat, PacketDto packetDto, CheckForm checkForm) {

		if (!threat.getMacsSrc().isEmpty()) {
			checkForm.setMacSrc(Arrays.asList(threat.getMacsSrc()
				.split("~")).contains(packetDto.getMacSrc()));
		}

		if (!threat.getMacsDst().isEmpty()) {
			checkForm.setMacDst(Arrays.asList(threat.getMacsDst()
				.split("~")).contains(packetDto.getMacDst()));
		}

		if (!threat.getIpsSrc().isEmpty()) {
			checkForm.setIpSrc(Arrays.asList(threat.getIpsSrc()
				.split("~")).contains(packetDto.getIpSrc()));
		}

		if (!threat.getIpsDst().isEmpty()) {
			checkForm.setIpDst(Arrays.asList(threat.getIpsDst()
				.split("~")).contains(packetDto.getIpDst()));
		}

		if (!threat.getIpsSrc().isEmpty()) {
			checkForm.setIpSrc(Arrays.asList(threat.getIpsSrc()
				.split("~")).contains(packetDto.getIpSrc()));
		}

		if (!threat.getProtocol().isEmpty()) {
			checkForm.setProtocol(packetDto.getProtocol().contains(threat.getProtocol()));
		}

		if (!threat.getPortsSrc().isEmpty()) {
			checkForm.setPortSrc(Arrays.asList(threat.getPortsSrc()
				.split("~")).contains(packetDto.getPortSrc()));
		}

		if (!threat.getPortsDst().isEmpty()) {
			checkForm.setPortDst(Arrays.asList(threat.getPortsDst()
				.split("~")).contains(packetDto.getPortDst()));
		}

		if (!threat.getPayload().isEmpty()) {
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
		// packetDto.setInterceptedAt(pcapHandle.getTimestamp());
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
		pcap.close();
	}
}
