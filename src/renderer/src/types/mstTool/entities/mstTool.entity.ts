import { EntityToolUsageInterface } from "../../toolUsage/entities/toolUsage.entity";
import { EntityToolQuarantineInterface } from "../../toolQuarantine/entities/toolQuarantine.entity";

export interface EntityMstToolInterface {
  id: string;
  bot: string;
  name: string | null;
  maxLife: number;
  toolUsage?: EntityToolUsageInterface[];
  toolQuarantines?: EntityToolQuarantineInterface[];
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
