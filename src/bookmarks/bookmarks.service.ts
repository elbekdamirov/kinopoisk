import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBookmarkDto } from "./dto/create-bookmark.dto";
import { UpdateBookmarkDto } from "./dto/update-bookmark.dto";

@Injectable()
export class BookmarksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBookmarkDto) {
    return this.prisma.bookmark.create({ data: dto });
  }

  async findAll() {
    return this.prisma.bookmark.findMany({
      include: {
        User: {
          select: { id: true, full_name: true },
        },
        Movies: {
          select: { id: true, title: true, posterUrl: true },
        },
      },
    });
  }

  async findOne(id: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id },
      include: {
        User: {
          select: { id: true, full_name: true },
        },
        Movies: {
          select: { id: true, title: true, posterUrl: true },
        },
      },
    });

    if (!bookmark) throw new NotFoundException("Bookmark not found");
    return bookmark;
  }

  async update(id: number, dto: UpdateBookmarkDto) {
    const exist = await this.prisma.bookmark.findUnique({ where: { id } });
    if (!exist) throw new NotFoundException("Bookmark not found");

    return this.prisma.bookmark.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const exist = await this.prisma.bookmark.findUnique({ where: { id } });
    if (!exist) throw new NotFoundException("Bookmark not found");

    return this.prisma.bookmark.delete({ where: { id } });
  }
}