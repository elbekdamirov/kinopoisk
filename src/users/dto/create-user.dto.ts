import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    example: "Elbek Damirov",
    description: "Foydalanuvchining to'liq ismi",
  })
  @IsString({ message: "full_name matn bo'lishi kerak" })
  @IsNotEmpty({ message: "full_name bo'sh bo'lishi mumkin emas" })
  @MaxLength(100, {
    message: "full_name maksimal 100 ta belgidan iborat bo'lishi mumkin",
  })
  full_name: string;

  @ApiProperty({
    example: "elbek@example.com",
    description: "Foydalanuvchining email manzili",
  })
  @IsEmail({}, { message: "email noto'g'ri formatda" })
  @IsNotEmpty({ message: "email bo'sh bo'lishi mumkin emas" })
  email: string;

  @ApiProperty({
    example: "StrongP@ssw0rd",
    description: "Parol (kamida 8 ta belgi)",
  })
  @IsString()
  @MinLength(6, {
    message: "password kamida 8 ta belgidan iborat bo'lishi kerak",
  })
  password: string;

  @ApiProperty({
    example: "StrongP@ssw0rd",
    description: "Parol tasdiqlanishi",
  })
  @IsString()
  @IsNotEmpty({ message: "confirm_password bo'sh bo'lishi mumkin emas" })
  confirm_password: string;

  @ApiProperty({
    example: "https://example.com/avatar.png",
    required: false,
    description: "Avatar URL manzili",
  })
  @IsOptional()
  @IsString({ message: "avatar_url matn bo'lishi kerak" })
  avatar_url?: string;
}
