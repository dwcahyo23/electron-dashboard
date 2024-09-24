import { ConnectMstComInterface } from "../../mstCom/dto/connect-mstCom.dto";
import { ConnectMstMchInterface } from "../../mstMch/dto/connect-mstMch.dto";
import { ConnectMstMtnPrioInterface } from "../../mstMtnPrio/dto/connect-mstMtnPrio.dto";
import { Status } from "../../enums";
import { CreateMnWoPpInterface } from "../../mnWoPp/dto/create-mnWoPp.dto";
import { ConnectMnWoPpInterface } from "../../mnWoPp/dto/connect-mnWoPp.dto";
import { ConnectMnWoReportInterface } from "../../mnWoReport/dto/connect-mnWoReport.dto";

interface CreateMnWoMstComRelationInputInterface {
  connect: ConnectMstComInterface;
}
interface CreateMnWoMstMchRelationInputInterface {
  connect: ConnectMstMchInterface;
}
interface CreateMnWoMstMtnPrioRelationInputInterface {
  connect: ConnectMstMtnPrioInterface;
}
interface CreateMnWoMnWoPpRelationInputInterface {
  create?: CreateMnWoPpInterface[];
  connect?: ConnectMnWoPpInterface[];
}
interface CreateMnWoMnWoReportRelationInputInterface {
  connect: ConnectMnWoReportInterface;
}

export interface CreateMnWoInterface {
  woId: string;
  comId: string;
  mstCom: CreateMnWoMstComRelationInputInterface;
  mcCd: string;
  mstMch: CreateMnWoMstMchRelationInputInterface;
  woDep?: string | null;
  woShif?: string | null;
  woPri: string;
  mstMtnPrio: CreateMnWoMstMtnPrioRelationInputInterface;
  woAt?: Date | null;
  woStopAt?: Date | null;
  woAppendAt?: Date | null;
  woClose?: Status;
  woCloseAt?: Date | null;
  woUser?: string | null;
  woAppr?: Status;
  woApprBy?: string | null;
  woApprAt?: Date | null;
  mttf?: number | null;
  mtbf?: number | null;
  mttr?: number | null;
  woMemo?: string | null;
  woRemarks?: string | null;
  mnWoPp?: CreateMnWoMnWoPpRelationInputInterface;
  mnWoReport: CreateMnWoMnWoReportRelationInputInterface | null;
  createdBy?: string;
  updatedBy?: string;
}
