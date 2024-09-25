import { CreateMstKindMchPartInterface } from '../../mstKindMchPart/dto/create-mstKindMchPart.dto'
import { ConnectMstKindMchPartInterface } from '../../mstKindMchPart/dto/connect-mstKindMchPart.dto'

interface CreateMstTypeMchPartMstKindMchPartRelationInputInterface {
  create?: CreateMstKindMchPartInterface
  connect?: ConnectMstKindMchPartInterface
}

export interface CreateMstTypeMchPartInterface {
  typeNm: string
  kindNm: string
  mstKindMchPart: CreateMstTypeMchPartMstKindMchPartRelationInputInterface
  typeMemo?: string | null
  createdBy?: string
  updatedBy?: string
}
