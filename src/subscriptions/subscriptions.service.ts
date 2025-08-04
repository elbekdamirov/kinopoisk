import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSubscriptionDto) {
    return this.prisma.subscription.create({ data: dto });
  }

  async findAll() {
    return this.prisma.subscription.findMany({
      include: {
        payments: true,
      },
    });
  }

  async findOne(id: number) {
    const sub = await this.prisma.subscription.findUnique({
      where: { id },
      include: { payments: true },
    });

    if (!sub) throw new NotFoundException("Subscription not found");
    return sub;
  }

  async update(id: number, dto: UpdateSubscriptionDto) {
    const existing = await this.prisma.subscription.findUnique({
      where: { id },
    });
    if (!existing) throw new NotFoundException("Subscription not found");

    return this.prisma.subscription.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.subscription.findUnique({
      where: { id },
    });
    if (!existing) throw new NotFoundException("Subscription not found");

    return this.prisma.subscription.delete({ where: { id } });
  }
}
