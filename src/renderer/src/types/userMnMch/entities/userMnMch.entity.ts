import { EntityMstComInterface } from "../../mstCom/entities/mstCom.entity";
import { EntityUserInterface } from "../../user/entities/user.entity";
import { EntityMstMtnLocInterface } from "../../mstMtnLoc/entities/mstMtnLoc.entity";

export interface EntityUserMnMchInterface {
  com: string;
  mstCom?: EntityMstComInterface;
  nik: string;
  user?: EntityUserInterface;
  mtnLocId: string;
  mtnLoc?: EntityMstMtnLocInterface;
}
