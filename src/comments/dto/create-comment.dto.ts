import { IsInt, IsOptional, IsString, Min, MaxLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCommentDto {
  @ApiProperty({ example: 1, description: "Foydalanuvchi ID raqami" })
  @IsInt({ message: "userId butun son bo'lishi kerak" })
  userId: number;

  @ApiProperty({ example: 10, description: "Film ID raqami" })
  @IsInt({ message: "moviesId butun son bo'lishi kerak" })
  moviesId: number;

  @ApiProperty({ example: "Zo'r film edi!", description: "Komment matni" })
  @IsString({ message: "message matn bo'lishi kerak" })
  @MaxLength(1000, {
    message: "Komment maksimal 1000 ta belgidan oshmasligi kerak",
  })
  message: string;

  @ApiPropertyOptional({ example: 5, description: "Rating ID (ixtiyoriy)" })
  @IsOptional()
  @IsInt({
    message: "ratingId butun son bo'lishi kerak (agar berilgan bo'lsa)",
  })
  ratingId?: number;
}
