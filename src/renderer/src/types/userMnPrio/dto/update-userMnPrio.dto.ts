import { ConnectMstComInterface } from '../../mstCom/dto/connect-mstCom.dto'
import { ConnectUserInterface } from '../../user/dto/connect-user.dto'
import { ConnectMstMtnPrioInterface } from '../../mstMtnPrio/dto/connect-mstMtnPrio.dto'

interface UpdateUserMnPrioMstComRelationInputInterface {
  connect: ConnectMstComInterface
}
interface UpdateUserMnPrioUserRelationInputInterface {
  connect: ConnectUserInterface
}
interface UpdateUserMnPrioMtnPrioRelationInputInterface {
  connect: ConnectMstMtnPrioInterface
}

export interface UpdateUserMnPrioInterface {
  com?: string
  mstCom?: UpdateUserMnPrioMstComRelationInputInterface
  nik?: string
  user?: UpdateUserMnPrioUserRelationInputInterface
  prioId?: string
  mtnPrio?: UpdateUserMnPrioMtnPrioRelationInputInterface
  createdBy?: string
  updatedBy?: string
}
