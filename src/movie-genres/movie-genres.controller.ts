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
import { CreateMovieGenreDto } from "./dto/create-movie-genre.dto";
import { UpdateMovieGenreDto } from "./dto/update-movie-genre.dto";
import { MovieGenreService } from "./movie-genres.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { AccessTokenAdminGuard } from "src/common/guards";
import { RolesGuard } from "src/common/guards/role.guard";

@Controller("movie-genres")
export class MovieGenresController {
  constructor(private readonly movieGenresService: MovieGenreService) {}

  @UseGuards(AccessTokenAdminGuard, RolesGuard)
  @Roles("content_manager", "admin", "superadmin")
  @Post()
  create(@Body() createMovieGenreDto: CreateMovieGenreDto) {
    return this.movieGenresService.create(createMovieGenreDto);
  }

  @Get()
  findAll() {
    return this.movieGenresService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.movieGenresService.findOne(+id);
  }

  @UseGuards(AccessTokenAdminGuard, RolesGuard)
  @Roles("content_manager", "admin", "superadmin")
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMovieGenreDto: UpdateMovieGenreDto
  ) {
    return this.movieGenresService.update(+id, updateMovieGenreDto);
  }

  @UseGuards(AccessTokenAdminGuard, RolesGuard)
  @Roles("content_manager", "admin", "superadmin")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.movieGenresService.remove(+id);
  }
}
