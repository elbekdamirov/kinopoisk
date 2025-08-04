import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePersonDto } from "./dto/create-person.dto";
import { UpdatePersonDto } from "./dto/update-person.dto";

@Injectable()
export class PersonsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePersonDto) {
    return this.prisma.persons.create({ data: dto });
  }

  async findAll() {
    return this.prisma.persons.findMany({
      include: {
        movies: {
          select: {
            role: true,
            characterName: true,
            Movies: {
              select: {
                title: true,
                posterUrl: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const person = await this.prisma.persons.findUnique({
      where: { id },
      include: {
        movies: {
          select: {
            role: true,
            characterName: true,
            Movies: {
              select: {
                title: true,
                posterUrl: true,
              },
            },
          },
        },
      },
    });

    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }

    return person;
  }

  async update(id: number, dto: UpdatePersonDto) {
    const exists = await this.prisma.persons.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }

    return this.prisma.persons.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.persons.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }

    return this.prisma.persons.delete({ where: { id } });
  }
}
