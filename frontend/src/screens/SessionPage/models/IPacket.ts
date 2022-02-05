export interface IPacket {
  id: string;
  interceptedAt: string;
  macSrc: string;
  macDst: string;
  ipSrc: string;
  ipDst: string;
  protocol: string;
  portSrc: string;
  portDst: string;
  suspicious: boolean;
  payload: string;
}
