import { ConnectUserInterface } from '../../user/dto/connect-user.dto'
import { ConnectMnWoReportInterface } from '../../mnWoReport/dto/connect-mnWoReport.dto'
import { OperatePosition } from '../../enums'

interface CreateMnWoOperateUserRelationInputInterface {
  connect: ConnectUserInterface
}
interface CreateMnWoOperateMnWoReportRelationInputInterface {
  connect: ConnectMnWoReportInterface
}

export interface CreateMnWoOperateInterface {
  nik: string
  user: CreateMnWoOperateUserRelationInputInterface
  repId: string
  mnWoReport: CreateMnWoOperateMnWoReportRelationInputInterface
  opPos: OperatePosition
  opPoint: number
  createdBy?: string
  updatedBy?: string
}
