import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateMoviePersonDto } from "./dto/create-movie-person.dto";
import { UpdateMoviePersonDto } from "./dto/update-movie-person.dto";

@Injectable()
export class MoviePersonService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMoviePersonDto) {
    return this.prisma.moviePerson.create({ data: dto });
  }

  async findAll() {
    return this.prisma.moviePerson.findMany({
      include: {
        Persons: {
          select: {
            full_name: true,
            avatarUrl: true,
          },
        },
        Movies: {
          select: {
            title: true,
            posterUrl: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const moviePerson = await this.prisma.moviePerson.findUnique({
      where: { id },
      include: {
        Persons: true,
        Movies: true,
      },
    });

    if (!moviePerson) {
      throw new NotFoundException(`MoviePerson with ID ${id} not found`);
    }

    return moviePerson;
  }

  async update(id: number, dto: UpdateMoviePersonDto) {
    const exists = await this.prisma.moviePerson.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`MoviePerson with ID ${id} not found`);
    }

    return this.prisma.moviePerson.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.moviePerson.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`MoviePerson with ID ${id} not found`);
    }

    return this.prisma.moviePerson.delete({ where: { id } });
  }
}
