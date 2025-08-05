import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserSubscriptionDto } from "./dto/create-user-subscription.dto";
import { UpdateUserSubscriptionDto } from "./dto/update-user-subscription.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserSubscriptionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserSubscriptionDto) {
    return this.prisma.userSubscription.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.userSubscription.findMany({
      include: {
        User: true,
        Subscription: true,
        payments: true,
      },
    });
  }

  async findOne(id: number) {
    const subscription = await this.prisma.userSubscription.findFirst({
      where: { userId: id },
      include: {
        User: true,
        Subscription: true,
        payments: true,
      },
    });

    if (!subscription) {
      throw new NotFoundException(`UserSubscription with ID ${id} not found`);
    }

    return subscription;
  }

  async update(id: number, dto: UpdateUserSubscriptionDto) {
    const existing = await this.prisma.userSubscription.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`UserSubscription with ID ${id} not found`);
    }

    return this.prisma.userSubscription.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.userSubscription.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`UserSubscription with ID ${id} not found`);
    }

    return this.prisma.userSubscription.delete({
      where: { id },
    });
  }
}
