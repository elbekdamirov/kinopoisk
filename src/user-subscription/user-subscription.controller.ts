import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from "@nestjs/common";
import { UserSubscriptionService } from "./user-subscription.service";
import { CreateUserSubscriptionDto } from "./dto/create-user-subscription.dto";
import { UpdateUserSubscriptionDto } from "./dto/update-user-subscription.dto";

@Controller("user-subscription")
export class UserSubscriptionController {
  constructor(
    private readonly userSubscriptionService: UserSubscriptionService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateUserSubscriptionDto) {
    return this.userSubscriptionService.create(dto);
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.userSubscriptionService.findOne(id);
  }
}
