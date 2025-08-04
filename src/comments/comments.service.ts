// src/comments/comments.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCommentDto) {
    return this.prisma.comment.create({ data: dto });
  }

  async findAll() {
    return this.prisma.comment.findMany({
      include: {
        User: {
          select: { id: true, full_name: true },
        },
        Movies: {
          select: { id: true, title: true },
        },
        Rating: {
          select: { id: true, rating: true },
        },
      },
    });
  }

  async findOne(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: {
        User: true,
        Movies: true,
        Rating: true,
      },
    });

    if (!comment) throw new NotFoundException("Comment not found");
    return comment;
  }

  async update(id: number, dto: UpdateCommentDto) {
    const existing = await this.prisma.comment.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException("Comment not found");

    return this.prisma.comment.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.comment.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException("Comment not found");

    return this.prisma.comment.delete({ where: { id } });
  }
}
