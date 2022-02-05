import { IPacket } from '@screens/SessionPage/models/IPacket';

export interface ISession {
  id: string;
  interfaceName: string;
  interfaceDescription: string;
  snifferOn: boolean;
  createdAt: string;
  state: string;
  packets: IPacket[];
}
