import { Role } from "generated/prisma";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Matches,
  IsEnum,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateAdminDto {
  @ApiProperty({
    example: "Elbek Damirov",
    description: "Adminning to'liq ismi",
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: "admin@example.com",
    description: "Admin email manzili",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "StrongP@ssw0rd",
    description: "Parol (kamida 8ta belgidan iborat bo'lishi kerak)",
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: "StrongP@ssw0rd", description: "Parolni tasdiqlash" })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @ApiPropertyOptional({
    example: "https://example.com/avatar.jpg",
    description: "Avatar URL (ixtiyoriy)",
  })
  @IsOptional()
  @IsString()
  avatar_url?: string;

  @ApiPropertyOptional({ enum: Role, description: "Admin roli (ixtiyoriy)" })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
