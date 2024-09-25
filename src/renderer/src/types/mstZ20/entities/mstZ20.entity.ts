import { EntityLinkZMchInterface } from '../../linkZMch/entities/linkZMch.entity'

export interface EntityMstZ20Interface {
  zId: number
  zCd: string
  zMac: string | null
  zBle: string | null
  linkZmch?: EntityLinkZMchInterface[]
}
