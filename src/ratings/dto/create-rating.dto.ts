import { IsInt, IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRatingDto {
  @ApiProperty({ example: 1, description: "Foydalanuvchi ID raqami" })
  @IsInt({ message: "userId butun son bo'lishi kerak" })
  @IsNotEmpty({ message: "userId bo'sh bo'lishi mumkin emas" })
  userId: number;

  @ApiProperty({ example: 10, description: "Film ID raqami" })
  @IsInt({ message: "moviesId butun son bo'lishi kerak" })
  @IsNotEmpty({ message: "moviesId bo'sh bo'lishi mumkin emas" })
  moviesId: number;

  @ApiProperty({
    example: 4.5,
    description: "Filmga berilgan baho (1 dan 5 gacha)",
  })
  @IsNumber({}, { message: "rating raqam bo'lishi kerak" })
  @Min(1, { message: "rating eng kamida 1 bo'lishi kerak" })
  @Max(5, { message: "rating eng ko'pi bilan 5 bo'lishi kerak" })
  rating: number;
}
