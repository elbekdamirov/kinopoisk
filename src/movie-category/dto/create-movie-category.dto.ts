import { IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMovieCategoryDto {
  @ApiProperty({ example: 1, description: "Kategoriya ID raqami" })
  @IsInt({ message: "categoryId butun son bo'lishi kerak" })
  categoryId: number;

  @ApiProperty({ example: 10, description: "Film ID raqami" })
  @IsInt({ message: "moviesId butun son bo'lishi kerak" })
  moviesId: number;
}
