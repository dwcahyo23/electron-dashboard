import { ConnectMnWoInterface } from "../../mnWo/dto/connect-mnWo.dto";
import { ConnectMstMchPartInterface } from "../../mstMchPart/dto/connect-mstMchPart.dto";
import { Status } from "../../enums";
import { ConnectMnWoPrInterface } from "../../mnWoPr/dto/connect-mnWoPr.dto";

interface UpdateMnWoPpMnWoRelationInputInterface {
  connect: ConnectMnWoInterface;
}
interface UpdateMnWoPpMstMchPartRelationInputInterface {
  connect: ConnectMstMchPartInterface;
}
interface UpdateMnWoPpMnWoPrRelationInputInterface {
  connect: ConnectMnWoPrInterface;
}

export interface UpdateMnWoPpInterface {
  woId?: string;
  mnWo?: UpdateMnWoPpMnWoRelationInputInterface;
  slug?: string | null;
  bom?: string;
  mstMchPart?: UpdateMnWoPpMstMchPartRelationInputInterface;
  ppQty?: number;
  ppUom?: string;
  ppAppr?: Status;
  ppApprAt?: Date | null;
  ppApprBy?: string | null;
  ppReady?: Status;
  ppReadyAt?: Date | null;
  ppReadyBy?: string | null;
  ppClosed?: Status;
  ppClosedAt?: Date | null;
  ppClosedBy?: string | null;
  ppMemo?: string | null;
  prId?: string | null;
  mnWoPr?: UpdateMnWoPpMnWoPrRelationInputInterface;
  createdBy?: string;
  updatedBy?: string;
}
