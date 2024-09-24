import { EntityMstMchInterface } from "../../mstMch/entities/mstMch.entity";
import { EntityMstTypeMchPartInterface } from "../../mstTypeMchPart/entities/mstTypeMchPart.entity";
import { EntityMnLiveMchPartInterface } from "../../mnLiveMchPart/entities/mnLiveMchPart.entity";
import { EntityMnWoPpInterface } from "../../mnWoPp/entities/mnWoPp.entity";

export interface EntityMstMchPartInterface {
  partId: string;
  bom: string;
  isActive: boolean;
  label: string;
  mcCd: string;
  mstMch?: EntityMstMchInterface;
  partCombination: string;
  mstPartCombination?: EntityMstTypeMchPartInterface;
  mnLiveMchPart?: EntityMnLiveMchPartInterface[];
  mnWoPP?: EntityMnWoPpInterface[];
}
