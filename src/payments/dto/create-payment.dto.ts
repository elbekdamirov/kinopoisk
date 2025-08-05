import { IsInt, IsNumberString, IsOptional, IsEnum } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Currency, PaymentStatus } from "generated/prisma";

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: "Foydalanuvchi ID raqami" })
  @IsInt()
  userId: number;

  @ApiPropertyOptional({
    example: 2,
    description: "UserSubscription ID raqami (majburiy emas)",
  })
  @IsOptional()
  @IsInt()
  userSubscriptionId?: number;

  @ApiProperty({
    example: "20000.00",
    description: "To'lov summasi (string sifatida, Decimal uchun)",
  })
  @IsNumberString()
  amount: string;

  @ApiPropertyOptional({
    enum: Currency,
    example: Currency.UZS,
    description: "Valyuta (UZS, USD...)",
  })
  @IsOptional()
  @IsEnum(Currency)
  currency?: Currency;

  @ApiPropertyOptional({
    enum: PaymentStatus,
    example: PaymentStatus.pending,
    description: "To'lov holati (pending, completed...)",
  })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;
}
