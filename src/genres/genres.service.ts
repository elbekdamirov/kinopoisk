import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateGenreDto } from "./dto/create-genre.dto";
import { UpdateGenreDto } from "./dto/update-genre.dto";

@Injectable()
export class GenresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGenreDto) {
    return this.prisma.genres.create({
      data: { name: dto.name },
    });
  }

  async findAll() {
    return this.prisma.genres.findMany({
      include: { movies: true },
    });
  }

  async findOne(id: number) {
    const genre = await this.prisma.genres.findUnique({
      where: { id },
      include: { movies: true },
    });
    if (!genre) throw new NotFoundException(`Genre ID ${id} not found`);
    return genre;
  }

  async update(id: number, dto: UpdateGenreDto) {
    const exists = await this.prisma.genres.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException(`Genre ID ${id} not found`);

    return this.prisma.genres.update({
      where: { id },
      data: { name: dto.name },
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.genres.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException(`Genre ID ${id} not found`);

    await this.prisma.genres.delete({ where: { id } });
    return { message: `Deleted Genre ID ${id}` };
  }
}
