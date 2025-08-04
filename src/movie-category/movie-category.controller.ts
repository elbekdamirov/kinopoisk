import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CreateMovieCategoryDto } from "./dto/create-movie-category.dto";
import { UpdateMovieCategoryDto } from "./dto/update-movie-category.dto";
import { MovieCategoriesService } from "./movie-category.service";

@Controller("movie-category")
export class MovieCategoryController {
  constructor(private readonly movieCategoryService: MovieCategoriesService) {}

  @Post()
  create(@Body() createMovieCategoryDto: CreateMovieCategoryDto) {
    return this.movieCategoryService.create(createMovieCategoryDto);
  }

  @Get()
  findAll() {
    return this.movieCategoryService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.movieCategoryService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMovieCategoryDto: UpdateMovieCategoryDto
  ) {
    return this.movieCategoryService.update(+id, updateMovieCategoryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.movieCategoryService.remove(+id);
  }
}
