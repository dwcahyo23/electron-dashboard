import { ConnectMnWoInterface } from '../../mnWo/dto/connect-mnWo.dto'
import { Status } from '../../enums'
import { CreateMnWoOperateInterface } from '../../mnWoOperate/dto/create-mnWoOperate.dto'
import { ConnectMnWoOperateInterface } from '../../mnWoOperate/dto/connect-mnWoOperate.dto'

interface CreateMnWoReportMnWoRelationInputInterface {
  connect: ConnectMnWoInterface
}
interface CreateMnWoReportMnWoOperateRelationInputInterface {
  create?: CreateMnWoOperateInterface[]
  connect?: ConnectMnWoOperateInterface[]
}

export interface CreateMnWoReportInterface {
  woId: string
  mnWo: CreateMnWoReportMnWoRelationInputInterface
  repCh: string
  repAn: string
  repCr: string
  repPr: string
  repClosed?: Status
  repClosedAt: Date
  repWorkStartAt: Date
  repWorkCloseAt: Date
  reportBy: string
  mnWoOperate?: CreateMnWoReportMnWoOperateRelationInputInterface
  createdBy?: string
  updatedBy?: string
}
