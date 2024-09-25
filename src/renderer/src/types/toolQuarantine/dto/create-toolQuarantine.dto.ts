export interface CreateToolQuarantineInterface {
  toolId: string
  reason: string
  lastLiveTime: number
  endTime?: Date | null
  createdBy?: string
  updatedBy?: string
}
