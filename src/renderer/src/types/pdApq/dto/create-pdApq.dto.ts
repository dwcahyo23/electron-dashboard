import { CreateUserInterface } from "../../user/dto/create-user.dto";
import { ConnectUserInterface } from "../../user/dto/connect-user.dto";
import { CreateMstComInterface } from "../../mstCom/dto/create-mstCom.dto";
import { ConnectMstComInterface } from "../../mstCom/dto/connect-mstCom.dto";

interface CreatePdApqUserRelationInputInterface {
  create?: CreateUserInterface;
  connect?: ConnectUserInterface;
}
interface CreatePdApqComRelationInputInterface {
  create?: CreateMstComInterface;
  connect?: ConnectMstComInterface;
}
interface CreatePdApqSectionHeadUserRelationInputInterface {
  create?: CreateUserInterface;
  connect?: ConnectUserInterface;
}

export interface CreatePdApqInterface {
  nik: string;
  user?: CreatePdApqUserRelationInputInterface;
  date: Date;
  comId: string;
  com?: CreatePdApqComRelationInputInterface;
  section: string;
  avaibility: number;
  performance: number;
  quality: number;
  sectionHead: string;
  sectionHeadUser?: CreatePdApqSectionHeadUserRelationInputInterface;
  createdBy?: string;
  updatedBy?: string;
}
