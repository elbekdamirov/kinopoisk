import { IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCountryDto {
  @ApiProperty({ example: "Uzbekistan", description: "Davlat nomi" })
  @IsString({ message: "name maydoni matn bo'lishi kerak" })
  name: string;
}
