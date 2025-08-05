import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePersonDto {
  @ApiProperty({
    example: "Leonardo DiCaprio",
    description: "Shaxsning to'liq ismi",
  })
  @IsString({ message: "full_name matn bo'lishi kerak" })
  @IsNotEmpty({ message: "full_name bo'sh bo'lishi mumkin emas" })
  full_name: string;

  @ApiPropertyOptional({
    example: "Amerikalik aktyor...",
    description: "Shaxs haqida ma'lumot",
  })
  @IsOptional()
  @IsString({ message: "bio matn bo'lishi kerak" })
  bio?: string;

  @ApiPropertyOptional({
    example: "https://example.com/avatar.jpg",
    description: "Avatar rasmi URL manzili",
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;
}
