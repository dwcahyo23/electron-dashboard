import { EntityLinkZMchInterface } from "../../linkZMch/entities/linkZMch.entity";
import { EntityMstMchPartInterface } from "../../mstMchPart/entities/mstMchPart.entity";
import { EntityMstComInterface } from "../../mstCom/entities/mstCom.entity";
import { EntityMstMtnLocInterface } from "../../mstMtnLoc/entities/mstMtnLoc.entity";
import { EntityMnWoInterface } from "../../mnWo/entities/mnWo.entity";
import { EntityPdScwInterface } from "../../pdScw/entities/pdScw.entity";

export interface EntityMstMchInterface {
  mcCd: string;
  mcNm: string;
  mcTp: string | null;
  linkZmch?: EntityLinkZMchInterface[];
  mstMchPart?: EntityMstMchPartInterface[];
  mcComId: string;
  mstCom?: EntityMstComInterface;
  mtnLocId: string;
  mtnLoc?: EntityMstMtnLocInterface;
  mnWO?: EntityMnWoInterface[];
  pdScw?: EntityPdScwInterface[];
}
