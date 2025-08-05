import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateNotificationDto {
  @ApiProperty({ example: 1, description: "Foydalanuvchi ID raqami" })
  @IsInt({ message: "userId butun son bo'lishi kerak" })
  userId: number;

  @ApiProperty({
    example: "Yangi xabar",
    description: "Bildirishnoma sarlavhasi",
  })
  @IsString({ message: "title matn bo'lishi kerak" })
  title: string;

  @ApiProperty({
    example: "Sizga yangi film tavsiya qilindi.",
    description: "Bildirishnoma matni",
  })
  @IsString({ message: "message matn bo'lishi kerak" })
  message: string;

  @ApiPropertyOptional({ example: false, description: "o'qilganligi holati" })
  @IsOptional()
  @IsBoolean({ message: "isRead true yoki false bo'lishi kerak" })
  isRead?: boolean;
}