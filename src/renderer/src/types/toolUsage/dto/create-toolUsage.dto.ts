import { ConnectMstToolInterface } from "../../mstTool/dto/connect-mstTool.dto";

interface CreateToolUsageMstToolRelationInputInterface {
  connect: ConnectMstToolInterface;
}

export interface CreateToolUsageInterface {
  toolId: string;
  mstTool: CreateToolUsageMstToolRelationInputInterface;
  mcCd: string;
  startTime: Date;
  endTime?: Date | null;
  createdBy?: string;
  updatedBy?: string;
}
