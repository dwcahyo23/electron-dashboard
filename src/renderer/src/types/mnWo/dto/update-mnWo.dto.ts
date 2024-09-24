import { ConnectMstComInterface } from "../../mstCom/dto/connect-mstCom.dto";
import { ConnectMstMchInterface } from "../../mstMch/dto/connect-mstMch.dto";
import { ConnectMstMtnPrioInterface } from "../../mstMtnPrio/dto/connect-mstMtnPrio.dto";
import { Status } from "../../enums";
import { CreateMnWoPpInterface } from "../../mnWoPp/dto/create-mnWoPp.dto";
import { ConnectMnWoPpInterface } from "../../mnWoPp/dto/connect-mnWoPp.dto";
import { ConnectMnWoReportInterface } from "../../mnWoReport/dto/connect-mnWoReport.dto";

interface UpdateMnWoMstComRelationInputInterface {
  connect: ConnectMstComInterface;
}
interface UpdateMnWoMstMchRelationInputInterface {
  connect: ConnectMstMchInterface;
}
interface UpdateMnWoMstMtnPrioRelationInputInterface {
  connect: ConnectMstMtnPrioInterface;
}
interface UpdateMnWoMnWoPpRelationInputInterface {
  create?: CreateMnWoPpInterface[];
  connect?: ConnectMnWoPpInterface[];
}
interface UpdateMnWoMnWoReportRelationInputInterface {
  connect: ConnectMnWoReportInterface;
}

export interface UpdateMnWoInterface {
  comId?: string;
  mstCom?: UpdateMnWoMstComRelationInputInterface;
  mcCd?: string;
  mstMch?: UpdateMnWoMstMchRelationInputInterface;
  woDep?: string | null;
  woShif?: string | null;
  woPri?: string;
  mstMtnPrio?: UpdateMnWoMstMtnPrioRelationInputInterface;
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
  mnWoPp?: UpdateMnWoMnWoPpRelationInputInterface;
  mnWoReport?: UpdateMnWoMnWoReportRelationInputInterface;
  createdBy?: string;
  updatedBy?: string;
}
