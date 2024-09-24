import { EntityUserDeptInterface } from "../../userDept/entities/userDept.entity";
import { EntityPdScwInterface } from "../../pdScw/entities/pdScw.entity";

export interface EntityMstDeptInterface {
  deptId: number;
  deptNm: string;
  userDept?: EntityUserDeptInterface[];
  pdScw?: EntityPdScwInterface[];
}
