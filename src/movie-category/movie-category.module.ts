import { Module } from "@nestjs/common";
import { MovieCategoryController } from "./movie-category.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { MovieCategoriesService } from "./movie-category.service";

@Module({
  imports: [PrismaModule],
  controllers: [MovieCategoryController],
  providers: [MovieCategoriesService],
})
export class MovieCategoryModule {}
