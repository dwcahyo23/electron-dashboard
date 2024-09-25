import { EntityMstZ20Interface } from '../../mstZ20/entities/mstZ20.entity'
import { EntityMstMchInterface } from '../../mstMch/entities/mstMch.entity'
import { EntityMstMtvInterface } from '../../mstMtv/entities/mstMtv.entity'

export interface EntityLinkZMchInterface {
  ZmId: number
  zId: number
  mstZ20?: EntityMstZ20Interface
  mcCd: string
  mstMch?: EntityMstMchInterface
  mtId: number
  mstMtv?: EntityMstMtvInterface
}
