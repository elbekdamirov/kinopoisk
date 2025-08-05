import { IsInt, IsPositive } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBookmarkDto {
  @ApiProperty({ example: 1, description: "Foydalanuvchi ID raqami" })
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty({ example: 1, description: "Film ID raqami" })
  @IsInt()
  @IsPositive()
  moviesId: number;
}
