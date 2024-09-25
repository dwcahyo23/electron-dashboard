import { EntityMstKindMchPartInterface } from '../../mstKindMchPart/entities/mstKindMchPart.entity'
import { EntityMstCatMchPartInterface } from '../../mstCatMchPart/entities/mstCatMchPart.entity'

export interface EntityMstVenMchPartInterface {
  venId: string
  venNm: string
  mstKindMchPart?: EntityMstKindMchPartInterface[]
  catNm: string
  mstCatMchPart?: EntityMstCatMchPartInterface
}
