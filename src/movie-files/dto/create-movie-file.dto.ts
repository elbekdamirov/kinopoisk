import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMovieFileDto {
  @ApiProperty({
    example: "https://example.com/movie.mp4",
    description: "Fayl URL manzili",
  })
  @IsString()
  fileUrl: string;

  @ApiProperty({ example: "mp4", description: "Fayl turi (masalan: mp4, mkv)" })
  @IsString({ message: "fileType matn bo'lishi kerak" })
  fileType: string;

  @ApiProperty({ example: 104857600, description: "Fayl o'lchami baytlarda" })
  @IsNumber({}, { message: "fileSize raqam bo'lishi kerak" })
  fileSize: number;

  @ApiProperty({ example: "1080p", description: "Video sifati" })
  @IsString({ message: "quality matn bolishi kerak" })
  quality: string;

  @ApiProperty({
    example: true,
    description: "Premium foydalanuvchilar uchunmi?",
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: "isPremium faqat true yoki false bo'lishi kerak" })
  isPremium?: boolean;

  @ApiProperty({ example: 5, description: "Film ID raqami" })
  @IsInt({ message: "moviesId butun son bo'lishi kerak" })
  moviesId: number;
}
