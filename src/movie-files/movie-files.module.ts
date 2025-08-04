import { Module } from "@nestjs/common";
import { MovieFilesController } from "./movie-files.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { MovieFileService } from "./movie-files.service";

@Module({
  imports: [PrismaModule],
  controllers: [MovieFilesController],
  providers: [MovieFileService],
})
export class MovieFilesModule {}
