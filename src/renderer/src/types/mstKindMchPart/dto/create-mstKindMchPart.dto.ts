import { CreateMstVenMchPartInterface } from '../../mstVenMchPart/dto/create-mstVenMchPart.dto'
import { ConnectMstVenMchPartInterface } from '../../mstVenMchPart/dto/connect-mstVenMchPart.dto'

interface CreateMstKindMchPartMstVenMchPartRelationInputInterface {
  create?: CreateMstVenMchPartInterface
  connect?: ConnectMstVenMchPartInterface
}

export interface CreateMstKindMchPartInterface {
  kindNm: string
  venNm: string
  mstVenMchPart: CreateMstKindMchPartMstVenMchPartRelationInputInterface
  createdBy?: string
  updatedBy?: string
}
