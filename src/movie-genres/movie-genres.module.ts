import { Module } from "@nestjs/common";
import { MovieGenresController } from "./movie-genres.controller";
import { MovieGenreService } from "./movie-genres.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [MovieGenresController],
  providers: [MovieGenreService],
})
export class MovieGenresModule {}
