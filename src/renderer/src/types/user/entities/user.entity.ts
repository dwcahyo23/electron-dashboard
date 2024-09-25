import { EntityUserRoleInterface } from '../../userRole/entities/userRole.entity'
import { EntityPdApqInterface } from '../../pdApq/entities/pdApq.entity'
import { EntityUserMnMchInterface } from '../../userMnMch/entities/userMnMch.entity'
import { EntityPdScwInterface } from '../../pdScw/entities/pdScw.entity'
import { EntityUserMnPrioInterface } from '../../userMnPrio/entities/userMnPrio.entity'
import { EntityUserDeptInterface } from '../../userDept/entities/userDept.entity'
import { EntityMnWoOperateInterface } from '../../mnWoOperate/entities/mnWoOperate.entity'

export interface EntityUserInterface {
  id: string
  nik: string
  password: string
  firstName: string
  lastName: string | null
  job: string | null
  data: { [key: string]: any } | null
  roles?: EntityUserRoleInterface[]
  pdApqs?: EntityPdApqInterface[]
  sectionHeadPdApqs?: EntityPdApqInterface[]
  userMch?: EntityUserMnMchInterface[]
  pdScw?: EntityPdScwInterface[]
  userPrio?: EntityUserMnPrioInterface[]
  userDept?: EntityUserDeptInterface[]
  parentUser?: EntityUserDeptInterface[]
  mnWoOperate?: EntityMnWoOperateInterface[]
}
