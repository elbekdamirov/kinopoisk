import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateMovieFileDto } from "./dto/create-movie-file.dto";
import { UpdateMovieFileDto } from "./dto/update-movie-file.dto";

@Injectable()
export class MovieFileService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateMovieFileDto) {
    return this.prisma.movieFile.create({ data: dto });
  }

  findAll() {
    return this.prisma.movieFile.findMany({
      include: {
        Movies: true,
      },
    });
  }

  async findOne(id: number) {
    const file = await this.prisma.movieFile.findUnique({
      where: { id },
      include: { Movies: true },
    });

    if (!file) throw new NotFoundException("MovieFile not found");

    return file;
  }

  async update(id: number, dto: UpdateMovieFileDto) {
    const exists = await this.prisma.movieFile.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException("MovieFile not found");

    return this.prisma.movieFile.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.movieFile.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException("MovieFile not found");

    return this.prisma.movieFile.delete({ where: { id } });
  }
}
