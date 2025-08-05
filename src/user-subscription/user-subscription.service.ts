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

  async findOne(id: number) {
    const subscription = await this.prisma.userSubscription.findUnique({
      where: { id },
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
}
