import { EntityMstMchInterface } from '../../mstMch/entities/mstMch.entity'
import { EntityMstDeptInterface } from '../../mstDept/entities/mstDept.entity'
import { EntityMstComInterface } from '../../mstCom/entities/mstCom.entity'
import { EntityUserInterface } from '../../user/entities/user.entity'
import { Status } from '../../enums'

export interface EntityPdScwInterface {
  id: string
  mcCd: string
  mstMch?: EntityMstMchInterface
  scwTo: string
  mstDept?: EntityMstDeptInterface
  scwCom: string
  mstCom?: EntityMstComInterface
  scwFrom: string
  user?: EntityUserInterface
  scwMemo: string
  scwRemarks: string
  scwDrw: string | null
  scwPrd: string | null
  scwStatus: Status
  scwStartAt: Date | null
  scwProgresAt: Date | null
  scwCloseAt: Date | null
}
