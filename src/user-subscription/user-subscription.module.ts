import { Module } from "@nestjs/common";
import { UserSubscriptionService } from "./user-subscription.service";
import { UserSubscriptionController } from "./user-subscription.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [UserSubscriptionController],
  providers: [UserSubscriptionService],
})
export class UserSubscriptionModule {}
