import { CreateMstCatMchPartInterface } from "../../mstCatMchPart/dto/create-mstCatMchPart.dto";
import { ConnectMstCatMchPartInterface } from "../../mstCatMchPart/dto/connect-mstCatMchPart.dto";

interface CreateMstVenMchPartMstCatMchPartRelationInputInterface {
  create?: CreateMstCatMchPartInterface;
  connect?: ConnectMstCatMchPartInterface;
}

export interface CreateMstVenMchPartInterface {
  venNm: string;
  catNm: string;
  mstCatMchPart: CreateMstVenMchPartMstCatMchPartRelationInputInterface;
  createdBy?: string;
  updatedBy?: string;
}
