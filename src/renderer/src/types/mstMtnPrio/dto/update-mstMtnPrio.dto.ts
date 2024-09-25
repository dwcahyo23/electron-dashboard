import { ConnectUserMnPrioInterface } from '../../userMnPrio/dto/connect-userMnPrio.dto'
import { ConnectMnWoInterface } from '../../mnWo/dto/connect-mnWo.dto'

interface UpdateMstMtnPrioUserPrioRelationInputInterface {
  connect: ConnectUserMnPrioInterface[]
}
interface UpdateMstMtnPrioMnWoRelationInputInterface {
  connect: ConnectMnWoInterface[]
}

export interface UpdateMstMtnPrioInterface {
  prioNm?: string
  prioColor?: string
  userPrio?: UpdateMstMtnPrioUserPrioRelationInputInterface
  mnWo?: UpdateMstMtnPrioMnWoRelationInputInterface
  createdBy?: string
  updatedBy?: string
}
