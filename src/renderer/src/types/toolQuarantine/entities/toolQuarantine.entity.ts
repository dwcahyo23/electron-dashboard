import { EntityMstToolInterface } from '../../mstTool/entities/mstTool.entity'

export interface EntityToolQuarantineInterface {
  id: string
  toolId: string
  mstTool?: EntityMstToolInterface
  reason: string
  lastLiveTime: number
  startTime: Date
  endTime: Date | null
  createdBy: string
  updatedBy: string
  createdAt: Date
  updatedAt: Date
}
