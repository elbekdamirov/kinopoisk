import { IsInt, IsBoolean, IsDateString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserSubscriptionDto {
  @ApiProperty({ example: 1, description: "Foydalanuvchi ID" })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 2, description: "Subscription ID" })
  @IsInt()
  subscriptionId: number;

  @ApiProperty({
    example: "2025-12-31T23:59:59.000Z",
    description: "Obuna tugash sanasi",
  })
  @IsDateString()
  endDate: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  isActive?: boolean;
}
