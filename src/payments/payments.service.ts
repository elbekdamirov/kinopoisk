import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePaymentDto) {
    return this.prisma.payment.create({ data: dto });
  }

  findAll() {
    return this.prisma.payment.findMany({
      include: {
        User: { select: { id: true, email: true } },
        Subscription: { select: { id: true, name: true, price: true } },
      },
    });
  }

  async findOne(id: number) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: {
        User: { select: { id: true, email: true } },
        Subscription: { select: { id: true, name: true, price: true } },
      },
    });
    if (!payment) throw new NotFoundException("Payment not found");
    return payment;
  }

  async update(id: number, dto: UpdatePaymentDto) {
    const exists = await this.prisma.payment.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException("Payment not found");

    return this.prisma.payment.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.payment.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException("Payment not found");

    return this.prisma.payment.delete({ where: { id } });
  }
}
