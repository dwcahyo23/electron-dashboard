import { ConnectUserRoleInterface } from "../../userRole/dto/connect-userRole.dto";
import { ConnectPdApqInterface } from "../../pdApq/dto/connect-pdApq.dto";
import { ConnectUserMnMchInterface } from "../../userMnMch/dto/connect-userMnMch.dto";
import { ConnectPdScwInterface } from "../../pdScw/dto/connect-pdScw.dto";
import { ConnectUserMnPrioInterface } from "../../userMnPrio/dto/connect-userMnPrio.dto";
import { ConnectUserDeptInterface } from "../../userDept/dto/connect-userDept.dto";
import { ConnectMnWoOperateInterface } from "../../mnWoOperate/dto/connect-mnWoOperate.dto";

interface UpdateUserRolesRelationInputInterface {
  connect: ConnectUserRoleInterface[];
}
interface UpdateUserPdApqsRelationInputInterface {
  connect: ConnectPdApqInterface[];
}
interface UpdateUserSectionHeadPdApqsRelationInputInterface {
  connect: ConnectPdApqInterface[];
}
interface UpdateUserUserMchRelationInputInterface {
  connect: ConnectUserMnMchInterface[];
}
interface UpdateUserPdScwRelationInputInterface {
  connect: ConnectPdScwInterface[];
}
interface UpdateUserUserPrioRelationInputInterface {
  connect: ConnectUserMnPrioInterface[];
}
interface UpdateUserUserDeptRelationInputInterface {
  connect: ConnectUserDeptInterface[];
}
interface UpdateUserParentUserRelationInputInterface {
  connect: ConnectUserDeptInterface[];
}
interface UpdateUserMnWoOperateRelationInputInterface {
  connect: ConnectMnWoOperateInterface[];
}

export interface UpdateUserInterface {
  nik?: string;
  password?: string;
  firstName?: string;
  lastName?: string | null;
  job?: string | null;
  data?: { [key: string]: any } | null;
  roles?: UpdateUserRolesRelationInputInterface;
  pdApqs?: UpdateUserPdApqsRelationInputInterface;
  sectionHeadPdApqs?: UpdateUserSectionHeadPdApqsRelationInputInterface;
  userMch?: UpdateUserUserMchRelationInputInterface;
  pdScw?: UpdateUserPdScwRelationInputInterface;
  userPrio?: UpdateUserUserPrioRelationInputInterface;
  userDept?: UpdateUserUserDeptRelationInputInterface;
  parentUser?: UpdateUserParentUserRelationInputInterface;
  mnWoOperate?: UpdateUserMnWoOperateRelationInputInterface;
  createdBy?: string;
  updatedBy?: string;
}
