import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateMovieGenreDto } from "./dto/create-movie-genre.dto";
import { UpdateMovieGenreDto } from "./dto/update-movie-genre.dto";

@Injectable()
export class MovieGenreService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateMovieGenreDto) {
    return this.prisma.movieGenre.create({
      data: {
        genreId: dto.genreId,
        moviesId: dto.moviesId,
      },
    });
  }

  findAll() {
    return this.prisma.movieGenre.findMany({
      include: {
        Genres: true,
        Movies: true,
      },
    });
  }

  async findOne(id: number) {
    const movieGenre = await this.prisma.movieGenre.findUnique({
      where: { id },
      include: {
        Genres: true,
        Movies: true,
      },
    });

    if (!movieGenre) {
      throw new NotFoundException(`MovieGenre with ID ${id} not found`);
    }

    return movieGenre;
  }

  async update(id: number, dto: UpdateMovieGenreDto) {
    const exists = await this.prisma.movieGenre.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException("MovieGenre not found");

    return this.prisma.movieGenre.update({
      where: { id },
      data: {
        genreId: dto.genreId,
        moviesId: dto.moviesId,
      },
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.movieGenre.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException("MovieGenre not found");

    return this.prisma.movieGenre.delete({
      where: { id },
    });
  }
}
