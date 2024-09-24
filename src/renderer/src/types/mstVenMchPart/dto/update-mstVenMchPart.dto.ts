import { CreateMstCatMchPartInterface } from "../../mstCatMchPart/dto/create-mstCatMchPart.dto";
import { ConnectMstCatMchPartInterface } from "../../mstCatMchPart/dto/connect-mstCatMchPart.dto";

interface UpdateMstVenMchPartMstCatMchPartRelationInputInterface {
  create?: CreateMstCatMchPartInterface;
  connect?: ConnectMstCatMchPartInterface;
}

export interface UpdateMstVenMchPartInterface {
  venNm?: string;
  catNm?: string;
  mstCatMchPart?: UpdateMstVenMchPartMstCatMchPartRelationInputInterface;
  createdBy?: string;
  updatedBy?: string;
}
