import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { CreateMovieCategoryDto } from "./dto/create-movie-category.dto";
import { UpdateMovieCategoryDto } from "./dto/update-movie-category.dto";
import { MovieCategoriesService } from "./movie-category.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { AccessTokenAdminGuard } from "src/common/guards";
import { RolesGuard } from "src/common/guards/role.guard";

@Controller("movie-category")
export class MovieCategoryController {
  constructor(private readonly movieCategoryService: MovieCategoriesService) {}

  @UseGuards(AccessTokenAdminGuard, RolesGuard)
  @Roles("content_manager", "admin", "superadmin")
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

  @UseGuards(AccessTokenAdminGuard, RolesGuard)
  @Roles("content_manager", "admin", "superadmin")
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMovieCategoryDto: UpdateMovieCategoryDto
  ) {
    return this.movieCategoryService.update(+id, updateMovieCategoryDto);
  }

  @UseGuards(AccessTokenAdminGuard, RolesGuard)
  @Roles("content_manager", "admin", "superadmin")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.movieCategoryService.remove(+id);
  }
}
