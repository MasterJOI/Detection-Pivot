export interface IThreatFormRequest {
  title: string;
  macsSrc: string;
  macsDst: string;
  ipsSrc: string;
  ipsDst: string;
  protocol: string;
  portsSrc: string;
  portsDst: string;
  payload: string;
}
