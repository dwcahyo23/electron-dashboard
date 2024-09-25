import { ConnectMstComInterface } from '../../mstCom/dto/connect-mstCom.dto'
import { ConnectMstMtnLocInterface } from '../../mstMtnLoc/dto/connect-mstMtnLoc.dto'

interface UpdateMstMchMstComRelationInputInterface {
  connect: ConnectMstComInterface
}
interface UpdateMstMchMtnLocRelationInputInterface {
  connect: ConnectMstMtnLocInterface
}

export interface UpdateMstMchInterface {
  mcCd?: string
  mcNm?: string
  mcTp?: string | null
  mcComId?: string
  mstCom?: UpdateMstMchMstComRelationInputInterface
  mtnLocId?: string
  mtnLoc?: UpdateMstMchMtnLocRelationInputInterface
  createdBy?: string
  updatedBy?: string
}
