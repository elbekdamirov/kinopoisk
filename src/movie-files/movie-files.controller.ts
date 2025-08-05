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
import { CreateMovieFileDto } from "./dto/create-movie-file.dto";
import { UpdateMovieFileDto } from "./dto/update-movie-file.dto";
import { MovieFileService } from "./movie-files.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { AccessTokenAdminGuard } from "src/common/guards";
import { RolesGuard } from "src/common/guards/role.guard";

@Controller("movie-files")
export class MovieFilesController {
  constructor(private readonly movieFilesService: MovieFileService) {}

  @UseGuards(AccessTokenAdminGuard, RolesGuard)
  @Roles("content_manager", "admin", "superadmin")
  @Post()
  create(@Body() createMovieFileDto: CreateMovieFileDto) {
    return this.movieFilesService.create(createMovieFileDto);
  }

  @Get()
  findAll() {
    return this.movieFilesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.movieFilesService.findOne(+id);
  }

  @UseGuards(AccessTokenAdminGuard, RolesGuard)
  @Roles("content_manager", "admin", "superadmin")
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMovieFileDto: UpdateMovieFileDto
  ) {
    return this.movieFilesService.update(+id, updateMovieFileDto);
  }

  @UseGuards(AccessTokenAdminGuard, RolesGuard)
  @Roles("content_manager", "admin", "superadmin")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.movieFilesService.remove(+id);
  }
}
