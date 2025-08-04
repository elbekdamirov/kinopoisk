import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateMovieCategoryDto } from "./dto/create-movie-category.dto";
import { UpdateMovieCategoryDto } from "./dto/update-movie-category.dto";

@Injectable()
export class MovieCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMovieCategoryDto) {
    return this.prisma.movieCategory.create({
      data: {
        categoryId: dto.categoryId,
        moviesId: dto.moviesId,
      },
    });
  }

  async findAll() {
    return this.prisma.movieCategory.findMany({
      include: {
        Category: true,
        Movies: true,
      },
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.movieCategory.findUnique({
      where: { id },
      include: { Category: true, Movies: true },
    });
    if (!record)
      throw new NotFoundException(`MovieCategory ID ${id} not found`);
    return record;
  }

  async update(id: number, dto: UpdateMovieCategoryDto) {
    const exists = await this.prisma.movieCategory.findUnique({
      where: { id },
    });
    if (!exists)
      throw new NotFoundException(`MovieCategory ID ${id} not found`);

    return this.prisma.movieCategory.update({
      where: { id },
      data: {
        categoryId: dto.categoryId,
        moviesId: dto.moviesId,
      },
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.movieCategory.findUnique({
      where: { id },
    });
    if (!exists)
      throw new NotFoundException(`MovieCategory ID ${id} not found`);

    await this.prisma.movieCategory.delete({ where: { id } });
    return { message: `Deleted MovieCategory ID ${id}` };
  }
}
