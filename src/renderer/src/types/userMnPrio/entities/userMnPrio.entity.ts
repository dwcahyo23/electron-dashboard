import { EntityMstComInterface } from "../../mstCom/entities/mstCom.entity";
import { EntityUserInterface } from "../../user/entities/user.entity";
import { EntityMstMtnPrioInterface } from "../../mstMtnPrio/entities/mstMtnPrio.entity";

export interface EntityUserMnPrioInterface {
  com: string;
  mstCom?: EntityMstComInterface;
  nik: string;
  user?: EntityUserInterface;
  prioId: string;
  mtnPrio?: EntityMstMtnPrioInterface;
}
