import { EntityMstMchPartInterface } from '../../mstMchPart/entities/mstMchPart.entity'
import { EntityMstKindMchPartInterface } from '../../mstKindMchPart/entities/mstKindMchPart.entity'

export interface EntityMstTypeMchPartInterface {
  typeId: string
  typeNm: string
  mstMchPart?: EntityMstMchPartInterface[]
  kindNm: string
  mstKindMchPart?: EntityMstKindMchPartInterface
  typeMemo: string | null
}
