import { ConnectMstMchInterface } from "../../mstMch/dto/connect-mstMch.dto";
import { CreateMstTypeMchPartInterface } from "../../mstTypeMchPart/dto/create-mstTypeMchPart.dto";
import { ConnectMstTypeMchPartInterface } from "../../mstTypeMchPart/dto/connect-mstTypeMchPart.dto";

interface UpdateMstMchPartMstMchRelationInputInterface {
  connect: ConnectMstMchInterface;
}
interface UpdateMstMchPartMstPartCombinationRelationInputInterface {
  create?: CreateMstTypeMchPartInterface;
  connect?: ConnectMstTypeMchPartInterface;
}

export interface UpdateMstMchPartInterface {
  bom?: string;
  label?: string;
  mcCd?: string;
  mstMch?: UpdateMstMchPartMstMchRelationInputInterface;
  partCombination?: string;
  mstPartCombination?: UpdateMstMchPartMstPartCombinationRelationInputInterface;
  createdBy?: string;
  updatedBy?: string;
}
