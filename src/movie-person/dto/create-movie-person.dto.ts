import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PersonRole } from "generated/prisma";

export class CreateMoviePersonDto {
  @ApiProperty({ example: 1, description: "Shaxs ID raqami" })
  @IsInt({ message: "personId butun son bo'lishi kerak" })
  personId: number;

  @ApiProperty({ example: 5, description: "Film ID raqami" })
  @IsInt({ message: "moviesId butun son bo'lishi kerak" })
  moviesId: number;

  @ApiProperty({
    enum: PersonRole,
    example: PersonRole.actor,
    description: "Shaxs roli (masalan: actor, DIRECTOR)",
  })
  @IsEnum(PersonRole, { message: "role noto'g'ri qiymatga ega" })
  role: PersonRole;

  @ApiPropertyOptional({
    example: "John Wick",
    description: "Qahramon nomi agar mavjud bo'lsa",
  })
  @IsOptional()
  @IsString({ message: "characterName matn bo'lishi kerak" })
  characterName?: string;
}
