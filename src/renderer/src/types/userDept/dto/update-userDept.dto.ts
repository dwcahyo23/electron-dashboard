import { ConnectMstDeptInterface } from '../../mstDept/dto/connect-mstDept.dto'
import { ConnectUserInterface } from '../../user/dto/connect-user.dto'

interface UpdateUserDeptMstDeptRelationInputInterface {
  connect: ConnectMstDeptInterface
}
interface UpdateUserDeptUserRelationInputInterface {
  connect: ConnectUserInterface
}
interface UpdateUserDeptParentUserRelationInputInterface {
  connect: ConnectUserInterface
}

export interface UpdateUserDeptInterface {
  deptId?: number
  mstDept?: UpdateUserDeptMstDeptRelationInputInterface
  userId?: string
  user?: UpdateUserDeptUserRelationInputInterface
  parentId?: string | null
  parentUser?: UpdateUserDeptParentUserRelationInputInterface
}
