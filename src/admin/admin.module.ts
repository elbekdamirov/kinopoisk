import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminsService } from "./admin.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [AdminController],
  providers: [AdminsService],
})
export class AdminModule {}
