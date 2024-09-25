import { EntityUserMnMchInterface } from '../../userMnMch/entities/userMnMch.entity'
import { EntityUserMnPrioInterface } from '../../userMnPrio/entities/userMnPrio.entity'
import { EntityPdApqInterface } from '../../pdApq/entities/pdApq.entity'
import { EntityMstMchInterface } from '../../mstMch/entities/mstMch.entity'
import { EntityMnWoInterface } from '../../mnWo/entities/mnWo.entity'
import { EntityPdScwInterface } from '../../pdScw/entities/pdScw.entity'

export interface EntityMstComInterface {
  comId: string
  comNm: string
  userMch?: EntityUserMnMchInterface[]
  userPrio?: EntityUserMnPrioInterface[]
  pdApq?: EntityPdApqInterface[]
  mstMch?: EntityMstMchInterface[]
  mnWo?: EntityMnWoInterface[]
  pdScw?: EntityPdScwInterface[]
}
