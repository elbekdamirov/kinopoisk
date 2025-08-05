import { IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGenreDto {
  @ApiProperty({ example: "Action", description: "Janr nomi" })
  @IsString({ message: "name matn bo'lishi kerak" })
  name: string;
}
