export interface ToolUsageInterface {
  id: string;
  toolId: string;
  mcCd: string;
  startTime: Date;
  endTime: Date | null;
  liveTime: number;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
