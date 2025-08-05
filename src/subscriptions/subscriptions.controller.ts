import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { SubscriptionsService } from "./subscriptions.service";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";
import { AccessTokenAdminGuard } from "src/common/guards";
import { RolesGuard } from "src/common/guards/role.guard";
import { Roles } from "src/common/decorators/roles.decorator";

@Controller("subscriptions")
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @UseGuards(AccessTokenAdminGuard, RolesGuard)
  @Roles("content_manager", "admin", "superadmin")
  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsService.create(createSubscriptionDto);
  }

  @Get()
  findAll() {
    return this.subscriptionsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.subscriptionsService.findOne(+id);
  }

  @UseGuards(AccessTokenAdminGuard, RolesGuard)
  @Roles("content_manager", "admin", "superadmin")
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto
  ) {
    return this.subscriptionsService.update(+id, updateSubscriptionDto);
  }

  @UseGuards(AccessTokenAdminGuard, RolesGuard)
  @Roles("content_manager", "admin", "superadmin")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.subscriptionsService.remove(+id);
  }
}
