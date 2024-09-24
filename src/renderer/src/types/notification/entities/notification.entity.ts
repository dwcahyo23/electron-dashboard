import { EntityUserInterface } from "../../user/entities/user.entity";

export interface EntityNotificationInterface {
  id: number;
  whatsappNumber: string;
  notificationMessage: string;
  sentAt: Date;
  nik: string;
  user?: EntityUserInterface;
}
