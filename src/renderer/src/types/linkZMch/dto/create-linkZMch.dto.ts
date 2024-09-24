import { CreateMstZ20Interface } from "../../mstZ20/dto/create-mstZ20.dto";
import { ConnectMstZ20Interface } from "../../mstZ20/dto/connect-mstZ20.dto";
import { ConnectMstMchInterface } from "../../mstMch/dto/connect-mstMch.dto";
import { CreateMstMtvInterface } from "../../mstMtv/dto/create-mstMtv.dto";
import { ConnectMstMtvInterface } from "../../mstMtv/dto/connect-mstMtv.dto";

interface CreateLinkZMchMstZ20RelationInputInterface {
  create?: CreateMstZ20Interface;
  connect?: ConnectMstZ20Interface;
}
interface CreateLinkZMchMstMchRelationInputInterface {
  connect: ConnectMstMchInterface;
}
interface CreateLinkZMchMstMtvRelationInputInterface {
  create?: CreateMstMtvInterface;
  connect?: ConnectMstMtvInterface;
}

export interface CreateLinkZMchInterface {
  mstZ20: CreateLinkZMchMstZ20RelationInputInterface;
  mstMch: CreateLinkZMchMstMchRelationInputInterface;
  mstMtv: CreateLinkZMchMstMtvRelationInputInterface;
  createdBy?: string;
  updatedBy?: string;
}
