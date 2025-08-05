import { IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMovieGenreDto {
  @ApiProperty({ example: 3, description: "Janr ID raqami" })
  @IsInt({ message: "genreId butun son bo'lishi kerak" })
  genreId: number;

  @ApiProperty({ example: 10, description: "Film ID raqami" })
  @IsInt({ message: "moviesId butun son bo'lishi kerak" })
  moviesId: number;
}
