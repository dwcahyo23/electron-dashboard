import { ConnectUserRoleInterface } from "../../userRole/dto/connect-userRole.dto";
import { ConnectPdApqInterface } from "../../pdApq/dto/connect-pdApq.dto";
import { ConnectUserMnMchInterface } from "../../userMnMch/dto/connect-userMnMch.dto";
import { ConnectPdScwInterface } from "../../pdScw/dto/connect-pdScw.dto";
import { ConnectUserMnPrioInterface } from "../../userMnPrio/dto/connect-userMnPrio.dto";
import { ConnectUserDeptInterface } from "../../userDept/dto/connect-userDept.dto";
import { ConnectMnWoOperateInterface } from "../../mnWoOperate/dto/connect-mnWoOperate.dto";

interface CreateUserRolesRelationInputInterface {
  connect: ConnectUserRoleInterface[];
}
interface CreateUserPdApqsRelationInputInterface {
  connect: ConnectPdApqInterface[];
}
interface CreateUserSectionHeadPdApqsRelationInputInterface {
  connect: ConnectPdApqInterface[];
}
interface CreateUserUserMchRelationInputInterface {
  connect: ConnectUserMnMchInterface[];
}
interface CreateUserPdScwRelationInputInterface {
  connect: ConnectPdScwInterface[];
}
interface CreateUserUserPrioRelationInputInterface {
  connect: ConnectUserMnPrioInterface[];
}
interface CreateUserUserDeptRelationInputInterface {
  connect: ConnectUserDeptInterface[];
}
interface CreateUserParentUserRelationInputInterface {
  connect: ConnectUserDeptInterface[];
}
interface CreateUserMnWoOperateRelationInputInterface {
  connect: ConnectMnWoOperateInterface[];
}

export interface CreateUserInterface {
  nik: string;
  password: string;
  firstName: string;
  lastName?: string | null;
  job?: string | null;
  data?: { [key: string]: any } | null;
  roles?: CreateUserRolesRelationInputInterface;
  pdApqs?: CreateUserPdApqsRelationInputInterface;
  sectionHeadPdApqs?: CreateUserSectionHeadPdApqsRelationInputInterface;
  userMch?: CreateUserUserMchRelationInputInterface;
  pdScw?: CreateUserPdScwRelationInputInterface;
  userPrio?: CreateUserUserPrioRelationInputInterface;
  userDept?: CreateUserUserDeptRelationInputInterface;
  parentUser?: CreateUserParentUserRelationInputInterface;
  mnWoOperate?: CreateUserMnWoOperateRelationInputInterface;
  createdBy?: string;
  updatedBy?: string;
}
