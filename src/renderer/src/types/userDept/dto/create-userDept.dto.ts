import { ConnectMstDeptInterface } from '../../mstDept/dto/connect-mstDept.dto'
import { ConnectUserInterface } from '../../user/dto/connect-user.dto'

interface CreateUserDeptMstDeptRelationInputInterface {
  connect: ConnectMstDeptInterface
}
interface CreateUserDeptUserRelationInputInterface {
  connect: ConnectUserInterface
}
interface CreateUserDeptParentUserRelationInputInterface {
  connect: ConnectUserInterface
}

export interface CreateUserDeptInterface {
  deptId: number
  mstDept: CreateUserDeptMstDeptRelationInputInterface
  userId: string
  user: CreateUserDeptUserRelationInputInterface
  parentId?: string | null
  parentUser?: CreateUserDeptParentUserRelationInputInterface | null
}
