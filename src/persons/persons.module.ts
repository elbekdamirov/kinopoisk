import { Module } from "@nestjs/common";
import { PersonsService } from "./persons.service";
import { PersonsController } from "./persons.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [PersonsController],
  providers: [PersonsService],
})
export class PersonsModule {}
