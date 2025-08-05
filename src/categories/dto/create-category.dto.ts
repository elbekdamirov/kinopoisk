import { IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty({ example: "Action", description: "Kategoriya nomi" })
  @IsString()
  @Length(2, 50, {
    message: "Kategoriya nomi 2 dan 50 gacha belgidan iborat bo'lishi kerak",
  })
  name: string;
}