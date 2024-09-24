export interface ToolQuarantineInterface {
  id: string;
  toolId: string;
  reason: string;
  lastLiveTime: number;
  startTime: Date;
  endTime: Date | null;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
