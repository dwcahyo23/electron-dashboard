import { EntityMstTypeMchPartInterface } from "../../mstTypeMchPart/entities/mstTypeMchPart.entity";
import { EntityMstVenMchPartInterface } from "../../mstVenMchPart/entities/mstVenMchPart.entity";

export interface EntityMstKindMchPartInterface {
  kindId: string;
  kindNm: string;
  mstTypeMchPart?: EntityMstTypeMchPartInterface[];
  venNm: string;
  mstVenMchPart?: EntityMstVenMchPartInterface;
}
