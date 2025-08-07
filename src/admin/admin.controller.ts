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
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { AdminsService } from "./admin.service";
import { GetCurrentUserId } from "src/common/decorators";
import { RefreshTokenAdminGuard } from "src/common/guards";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth("token")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminsService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(RefreshTokenAdminGuard)
  @Patch()
  update(
    @GetCurrentUserId() id: number,
    @Body() updateAdminDto: UpdateAdminDto
  ) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(RefreshTokenAdminGuard)
  @Delete()
  remove(@GetCurrentUserId() id: number) {
    return this.adminService.remove(+id);
  }
}
