import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateMovieDto {
  @ApiProperty({ example: "Inception", description: "Film sarlavhasi" })
  @IsString({ message: "title matn bo‘lishi kerak" })
  title: string;

  @ApiPropertyOptional({
    example: "Bu film orzular ichidagi orzular haqida.",
    description: "Film tavsifi",
  })
  @IsOptional()
  @IsString({ message: "description matn bo‘lishi kerak" })
  description?: string;

  @ApiProperty({
    example: "2010-07-16",
    description: "Chiqarilgan sanasi (ISO formatda)",
  })
  @IsDateString({}, { message: "releaseDate ISO formatda sana bo‘lishi kerak" })
  releaseDate: Date;

  @ApiProperty({
    example: "2h 28m",
    description: "Davomiyligi (matn formatda)",
  })
  @IsString({ message: "duration matn bo‘lishi kerak" })
  duration: string;

  @ApiPropertyOptional({ example: "PG-13", description: "Yosh cheklovi" })
  @IsOptional()
  @IsString({ message: "ageRating matn bo‘lishi kerak" })
  ageRating?: string;

  @ApiPropertyOptional({
    example: "https://example.com/poster.jpg",
    description: "Poster URL manzili",
  })
  @IsOptional()
  @IsString({ message: "posterUrl matn bo‘lishi kerak" })
  posterUrl?: string;

  @ApiPropertyOptional({
    example: "https://example.com/trailer.mp4",
    description: "Treyler URL manzili",
  })
  @IsOptional()
  @IsString({ message: "trailerUrl matn bo‘lishi kerak" })
  trailerUrl?: string;

  @ApiPropertyOptional({
    example: true,
    description: "Premium filmmi yoki yo‘qmi",
  })
  @IsOptional()
  @IsBoolean({ message: "is_premium true yoki false bo‘lishi kerak" })
  is_premium?: boolean;

  @ApiProperty({
    example: 3,
    description: "Filmga tegishli mamlakat ID raqami",
  })
  @IsInt({ message: "countryId butun son bo‘lishi kerak" })
  countryId: number;
}
