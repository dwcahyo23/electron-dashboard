import { ConnectMstComInterface } from '../../mstCom/dto/connect-mstCom.dto'
import { ConnectUserInterface } from '../../user/dto/connect-user.dto'
import { ConnectMstMtnLocInterface } from '../../mstMtnLoc/dto/connect-mstMtnLoc.dto'

interface UpdateUserMnMchMstComRelationInputInterface {
  connect: ConnectMstComInterface
}
interface UpdateUserMnMchUserRelationInputInterface {
  connect: ConnectUserInterface
}
interface UpdateUserMnMchMtnLocRelationInputInterface {
  connect: ConnectMstMtnLocInterface
}

export interface UpdateUserMnMchInterface {
  com?: string
  mstCom?: UpdateUserMnMchMstComRelationInputInterface
  nik?: string
  user?: UpdateUserMnMchUserRelationInputInterface
  mtnLocId?: string
  mtnLoc?: UpdateUserMnMchMtnLocRelationInputInterface
  createdBy?: string
  updatedBy?: string
}
