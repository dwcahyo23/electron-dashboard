import { EntityMstMchInterface } from "../mstMch/mstMch.entity";

export interface EntityQSenseLogInterface {
  id: number;
  time: Date;
  mcCd: string;
  mstMch?: EntityMstMchInterface;
  run: boolean;
  counter: number;
  avaibility: number;
  performance: number;
  quality: number;
  stop: number;
}
