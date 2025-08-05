import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsInt,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Currency, PaymentStatus } from "generated/prisma";

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: "Foydalanuvchi ID raqami" })
  @IsInt({ message: "userId butun son bo'lishi kerak" })
  userId: number;

  @ApiProperty({ example: 3, description: "Obuna (subscription) ID raqami" })
  @IsInt({ message: "subscriptionId butun son bo'lishi kerak" })
  subscriptionId: number;

  @ApiProperty({
    example: "20000.00",
    description: 'To`lov summasi, string formatda (masalan: "20000.00")',
  })
  @IsNumberString({}, { message: "amount raqamli string bo'lishi kerak" })
  amount: string;

  @ApiPropertyOptional({
    enum: Currency,
    example: Currency.UZS,
    description: "Valyuta turi",
  })
  @IsOptional()
  @IsEnum(Currency, { message: "currency noto'g'ri qiymatga ega" })
  currency?: Currency;

  @ApiPropertyOptional({
    enum: PaymentStatus,
    example: PaymentStatus.pending,
    description: "To‘lov holati",
  })
  @IsOptional()
  @IsEnum(PaymentStatus, { message: "status noto'g'ri qiymatga ega" })
  status?: PaymentStatus;
}
