import { EntityMstVenMchPartInterface } from '../../mstVenMchPart/entities/mstVenMchPart.entity'

export interface EntityMstCatMchPartInterface {
  catId: string
  catNm: string
  mstVenMchPart?: EntityMstVenMchPartInterface[]
}
