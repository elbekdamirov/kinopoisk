import { Currency, PaymentStatus } from "generated/prisma";

export class CreatePaymentDto {
  userId: number;
  subscriptionId: number;
  amount: string;
  currency?: Currency;
  status?: PaymentStatus;
}
