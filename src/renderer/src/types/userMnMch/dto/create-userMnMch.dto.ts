import { ConnectMstComInterface } from '../../mstCom/dto/connect-mstCom.dto'
import { ConnectUserInterface } from '../../user/dto/connect-user.dto'
import { ConnectMstMtnLocInterface } from '../../mstMtnLoc/dto/connect-mstMtnLoc.dto'

interface CreateUserMnMchMstComRelationInputInterface {
  connect: ConnectMstComInterface
}
interface CreateUserMnMchUserRelationInputInterface {
  connect: ConnectUserInterface
}
interface CreateUserMnMchMtnLocRelationInputInterface {
  connect: ConnectMstMtnLocInterface
}

export interface CreateUserMnMchInterface {
  com: string
  mstCom: CreateUserMnMchMstComRelationInputInterface
  nik: string
  user: CreateUserMnMchUserRelationInputInterface
  mtnLocId: string
  mtnLoc: CreateUserMnMchMtnLocRelationInputInterface
  createdBy?: string
  updatedBy?: string
}
