import { ConnectMstComInterface } from '../../mstCom/dto/connect-mstCom.dto'
import { ConnectUserInterface } from '../../user/dto/connect-user.dto'
import { ConnectMstMtnPrioInterface } from '../../mstMtnPrio/dto/connect-mstMtnPrio.dto'

interface CreateUserMnPrioMstComRelationInputInterface {
  connect: ConnectMstComInterface
}
interface CreateUserMnPrioUserRelationInputInterface {
  connect: ConnectUserInterface
}
interface CreateUserMnPrioMtnPrioRelationInputInterface {
  connect: ConnectMstMtnPrioInterface
}

export interface CreateUserMnPrioInterface {
  com: string
  mstCom: CreateUserMnPrioMstComRelationInputInterface
  nik: string
  user: CreateUserMnPrioUserRelationInputInterface
  prioId: string
  mtnPrio: CreateUserMnPrioMtnPrioRelationInputInterface
  createdBy?: string
  updatedBy?: string
}
