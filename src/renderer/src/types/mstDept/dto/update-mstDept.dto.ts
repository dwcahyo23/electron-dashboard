import { ConnectUserDeptInterface } from "../../userDept/dto/connect-userDept.dto";
import { ConnectPdScwInterface } from "../../pdScw/dto/connect-pdScw.dto";

interface UpdateMstDeptUserDeptRelationInputInterface {
  connect: ConnectUserDeptInterface[];
}
interface UpdateMstDeptPdScwRelationInputInterface {
  connect: ConnectPdScwInterface[];
}

export interface UpdateMstDeptInterface {
  deptNm?: string;
  createdBy?: string;
  updatedBy?: string;
  userDept?: UpdateMstDeptUserDeptRelationInputInterface;
  pdScw?: UpdateMstDeptPdScwRelationInputInterface;
}
