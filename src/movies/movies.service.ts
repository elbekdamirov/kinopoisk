import { Injectable, NotFoundException, UseGuards } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { Roles } from "src/common/decorators/roles.decorator";
import { AccessTokenAdminGuard } from "src/common/guards";
import { RolesGuard } from "src/common/guards/role.guard";

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  @UseGuards(AccessTokenAdminGuard, RolesGuard)
  @Roles("content_manager", "admin", "superadmin")
  async create(dto: CreateMovieDto) {
    return this.prisma.movies.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.movies.findMany({
      include: {
        genres: { select: { Genres: { select: { name: true } } } },
        ratings: true,
        Countries: true,
      },
    });
  }

  async findOne(id: number) {
    const movie = await this.prisma.movies.findUnique({
      where: { id },
      include: {
        categories: true,
        movieFiles: true,
        genres: true,
        persons: true,
        bookmarks: true,
        ratings: true,
        comments: true,
        Countries: true,
      },
    });

    if (!movie) throw new NotFoundException("Movie not found");
    return movie;
  }

  @UseGuards(AccessTokenAdminGuard, RolesGuard)
  @Roles("content_manager", "admin", "superadmin")
  async update(id: number, dto: UpdateMovieDto) {
    const exists = await this.prisma.movies.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException("Movie not found");

    return this.prisma.movies.update({
      where: { id },
      data: dto,
    });
  }

  @UseGuards(AccessTokenAdminGuard, RolesGuard)
  @Roles("content_manager", "admin", "superadmin")
  async remove(id: number) {
    const exists = await this.prisma.movies.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException("Movie not found");

    return this.prisma.movies.delete({ where: { id } });
  }

  async searchByTitle(query: string) {
    return this.prisma.movies.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      include: {
        categories: true,
        movieFiles: true,
        genres: true,
        persons: true,
        bookmarks: true,
        ratings: true,
        comments: true,
        Countries: true,
      },
    });
  }
}
