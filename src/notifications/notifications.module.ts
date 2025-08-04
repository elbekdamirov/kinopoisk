import { Module } from "@nestjs/common";
import { NotificationsController } from "./notifications.controller";
import { NotificationService } from "./notifications.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [NotificationsController],
  providers: [NotificationService],
})
export class NotificationsModule {}
