import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSubscriptionDto {
  @ApiProperty({ example: "Premium", description: "Obuna nomi" })
  @IsString({ message: "name matn bo'lishi kerak" })
  @IsNotEmpty({ message: "name bo'sh bo'lishi mumkin emas" })
  @MaxLength(100, {
    message: "name maksimal 100 ta belgidan iborat bo'lishi mumkin",
  })
  name: string;

  @ApiProperty({
    example: "Reklamasiz, HD sifat, 2ta qurilma uchun",
    description: "Obuna haqida maʼlumot",
  })
  @IsString({ message: "info matn bo'lishi kerak" })
  @IsNotEmpty({ message: "info bo'sh bo'lishi mumkin emas" })
  info: string;

  @ApiProperty({ example: 25000, description: "Obunaning narxi (UZS)" })
  @IsNumber({}, { message: "price raqam bo'lishi kerak" })
  @IsPositive({ message: "price musbat bo'lishi kerak" })
  price: number;

  @ApiProperty({ example: 30, description: "Obuna muddati (kunlarda)" })
  @IsNumber({}, { message: "duration raqam bo'lishi kerak" })
  @IsPositive({ message: "duration musbat bo'lishi kerak" })
  duration: number;

  @ApiProperty({
    example: true,
    required: false,
    description: "Obuna faolmi yoki yo'q",
  })
  @IsOptional()
  @IsBoolean({ message: "is_active faqat true yoki false bo'lishi kerak" })
  is_active?: boolean;
}
