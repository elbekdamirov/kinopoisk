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
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { NotificationService } from "./notifications.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { AccessTokenAdminGuard } from "src/common/guards";
import { RolesGuard } from "src/common/guards/role.guard";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationService) {}

  @UseGuards(AccessTokenAdminGuard, RolesGuard)
  @Roles("moderator", "admin", "superadmin")
  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.notificationsService.findOne(+id);
  }

  @UseGuards(AccessTokenAdminGuard, RolesGuard)
  @Roles("moderator", "admin", "superadmin")
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateNotificationDto: UpdateNotificationDto
  ) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @UseGuards(AccessTokenAdminGuard, RolesGuard)
  @Roles("content_manager", "admin", "superadmin")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.notificationsService.remove(+id);
  }
}
