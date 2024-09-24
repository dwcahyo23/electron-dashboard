import { EntityMstComInterface } from "../../mstCom/entities/mstCom.entity";
import { EntityMstMchInterface } from "../../mstMch/entities/mstMch.entity";
import { EntityMstMtnPrioInterface } from "../../mstMtnPrio/entities/mstMtnPrio.entity";
import { Status } from "../../enums";
import { EntityMnWoPpInterface } from "../../mnWoPp/entities/mnWoPp.entity";
import { EntityMnWoReportInterface } from "../../mnWoReport/entities/mnWoReport.entity";

export interface EntityMnWoInterface {
  woId: string;
  comId: string;
  mstCom?: EntityMstComInterface;
  mcCd: string;
  mstMch?: EntityMstMchInterface;
  woDep: string | null;
  woShif: string | null;
  woPri: string;
  mstMtnPrio?: EntityMstMtnPrioInterface;
  woAt: Date | null;
  woStopAt: Date | null;
  woAppendAt: Date | null;
  woClose: Status;
  woCloseAt: Date | null;
  woUser: string | null;
  woAppr: Status;
  woApprBy: string | null;
  woApprAt: Date | null;
  mttf: number | null;
  mtbf: number | null;
  mttr: number | null;
  woMemo: string | null;
  woRemarks: string | null;
  mnWoPp?: EntityMnWoPpInterface[];
  mnWoReport?: EntityMnWoReportInterface;
}
