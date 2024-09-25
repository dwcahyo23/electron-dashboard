import { EntityMstDeptInterface } from '../../mstDept/entities/mstDept.entity'
import { EntityUserInterface } from '../../user/entities/user.entity'

export interface EntityUserDeptInterface {
  deptId: number
  mstDept?: EntityMstDeptInterface
  userId: string
  user?: EntityUserInterface
  parentId: string | null
  parentUser?: EntityUserInterface | null
}
