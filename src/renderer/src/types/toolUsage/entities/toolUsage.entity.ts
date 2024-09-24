import { EntityMstToolInterface } from "../../mstTool/entities/mstTool.entity";
import { EntityMstMchInterface } from "../../mstMch/entities/mstMch.entity";

export interface EntityToolUsageInterface {
  id: string;
  toolId: string;
  mstTool?: EntityMstToolInterface;
  mcCd: string;
  mstMch?: EntityMstMchInterface;
  startTime: Date;
  endTime: Date | null;
  liveTime: number;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
