import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRatingDto } from "./dto/create-rating.dto";
import { UpdateRatingDto } from "./dto/update-rating.dto";

@Injectable()
export class RatingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRatingDto) {
    return this.prisma.rating.create({ data: dto });
  }

  async findAll() {
    return this.prisma.rating.findMany({
      include: {
        User: {
          select: { id: true, full_name: true },
        },
        Movies: {
          select: { id: true, title: true, posterUrl: true },
        },
        commnets: true,
      },
    });
  }

  async findOne(id: number) {
    const rating = await this.prisma.rating.findUnique({
      where: { id },
      include: {
        User: {
          select: { id: true, full_name: true },
        },
        Movies: {
          select: { id: true, title: true },
        },
        commnets: true,
      },
    });

    if (!rating) throw new NotFoundException("Rating not found");
    return rating;
  }

  async update(id: number, dto: UpdateRatingDto) {
    const exist = await this.prisma.rating.findUnique({ where: { id } });
    if (!exist) throw new NotFoundException("Rating not found");

    return this.prisma.rating.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const exist = await this.prisma.rating.findUnique({ where: { id } });
    if (!exist) throw new NotFoundException("Rating not found");

    return this.prisma.rating.delete({ where: { id } });
  }
}
