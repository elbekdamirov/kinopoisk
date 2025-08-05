import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SigninAdminDto {
  @ApiProperty({
    example: "admin@example.com",
    description: "Adminning email manzili",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "StrongP@ssw0rd",
    description: "Parol (kamida 8ta belgidan iborat bo'lishi kerak)",
  })
  @IsString()
  @MinLength(8)
  password: string;
}