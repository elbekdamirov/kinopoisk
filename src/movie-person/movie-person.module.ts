import { Module } from "@nestjs/common";
import { MoviePersonService } from "./movie-person.service";
import { MoviePersonController } from "./movie-person.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [MoviePersonController],
  providers: [MoviePersonService],
})
export class MoviePersonModule {}
