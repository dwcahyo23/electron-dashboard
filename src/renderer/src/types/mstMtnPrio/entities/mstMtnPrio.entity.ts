import { EntityUserMnPrioInterface } from '../../userMnPrio/entities/userMnPrio.entity'
import { EntityMnWoInterface } from '../../mnWo/entities/mnWo.entity'

export interface EntityMstMtnPrioInterface {
  prioId: string
  prioNm: string
  prioColor: string
  userPrio?: EntityUserMnPrioInterface[]
  mnWo?: EntityMnWoInterface[]
}
