import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { UserSubscriptionService } from "./user-subscription.service";
import { CreateUserSubscriptionDto } from "./dto/create-user-subscription.dto";
import { UpdateUserSubscriptionDto } from "./dto/update-user-subscription.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from "src/common/decorators/roles.decorator";
import { AccessTokenAdminGuard } from "src/common/guards/access-token-admin.guard";
import { RolesGuard } from "src/common/guards/role.guard";
import { RefreshTokenGuard } from "src/common/guards";
import { GetCurrentUserId } from "src/common/decorators";

@Controller("user-subscriptions")
export class UserSubscriptionController {
  constructor(
    private readonly userSubscriptionService: UserSubscriptionService
  ) {}

  @Post()
  create(@Body() dto: CreateUserSubscriptionDto) {
    return this.userSubscriptionService.create(dto);
  }

  @UseGuards(AccessTokenAdminGuard, RolesGuard)
  @Roles("admin", "superadmin", "content_manager")
  @Get("all")
  findAll() {
    return this.userSubscriptionService.findAll();
  }

  @UseGuards(RefreshTokenGuard)
  @Get()
  async findOne(@GetCurrentUserId() id: number) {
    return this.userSubscriptionService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateUserSubscriptionDto
  ) {
    return this.userSubscriptionService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.userSubscriptionService.remove(id);
  }
}
