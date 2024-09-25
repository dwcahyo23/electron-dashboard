import { EntityUserMnMchInterface } from '../../userMnMch/entities/userMnMch.entity'
import { EntityMstMchInterface } from '../../mstMch/entities/mstMch.entity'

export interface EntityMstMtnLocInterface {
  mtnLocId: string
  mtnLocNm: string
  userMch?: EntityUserMnMchInterface[]
  mstMch?: EntityMstMchInterface[]
}
