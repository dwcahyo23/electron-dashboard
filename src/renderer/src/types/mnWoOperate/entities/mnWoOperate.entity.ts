import { EntityUserInterface } from "../../user/entities/user.entity";
import { EntityMnWoReportInterface } from "../../mnWoReport/entities/mnWoReport.entity";
import { OperatePosition } from "../../enums";

export interface EntityMnWoOperateInterface {
  nik: string;
  user?: EntityUserInterface;
  mnWoReport?: EntityMnWoReportInterface;
  opPos: OperatePosition;
  opPoint: number;
}
