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
import { MoviePersonService } from "./movie-person.service";
import { CreateMoviePersonDto } from "./dto/create-movie-person.dto";
import { UpdateMoviePersonDto } from "./dto/update-movie-person.dto";
import { Roles } from "src/common/decorators/roles.decorator";
import { AccessTokenAdminGuard } from "src/common/guards";
import { RolesGuard } from "src/common/guards/role.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth("token")
@Controller("movie-person")
export class MoviePersonController {
  constructor(private readonly moviePersonService: MoviePersonService) {}

  @UseGuards(AccessTokenAdminGuard, RolesGuard)
  @Roles("content_manager", "admin", "superadmin")
  @Post()
  create(@Body() createMoviePersonDto: CreateMoviePersonDto) {
    return this.moviePersonService.create(createMoviePersonDto);
  }

  @Get()
  findAll() {
    return this.moviePersonService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.moviePersonService.findOne(+id);
  }

  @UseGuards(AccessTokenAdminGuard, RolesGuard)
  @Roles("content_manager", "admin", "superadmin")
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMoviePersonDto: UpdateMoviePersonDto
  ) {
    return this.moviePersonService.update(+id, updateMoviePersonDto);
  }

  @UseGuards(AccessTokenAdminGuard, RolesGuard)
  @Roles("content_manager", "admin", "superadmin")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.moviePersonService.remove(+id);
  }
}
