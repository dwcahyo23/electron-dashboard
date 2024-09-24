import { CreateMstKindMchPartInterface } from "../../mstKindMchPart/dto/create-mstKindMchPart.dto";
import { ConnectMstKindMchPartInterface } from "../../mstKindMchPart/dto/connect-mstKindMchPart.dto";

interface UpdateMstTypeMchPartMstKindMchPartRelationInputInterface {
  create?: CreateMstKindMchPartInterface;
  connect?: ConnectMstKindMchPartInterface;
}

export interface UpdateMstTypeMchPartInterface {
  typeNm?: string;
  kindNm?: string;
  mstKindMchPart?: UpdateMstTypeMchPartMstKindMchPartRelationInputInterface;
  typeMemo?: string | null;
  createdBy?: string;
  updatedBy?: string;
}
