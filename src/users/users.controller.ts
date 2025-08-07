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
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Roles } from "src/common/decorators/roles.decorator";
import { AccessTokenAdminGuard, RefreshTokenGuard } from "src/common/guards";
import { RolesGuard } from "src/common/guards/role.guard";
import { GetCurrentUserId } from "src/common/decorators";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AccessTokenAdminGuard, RolesGuard)
  @Roles("admin", "superadmin")
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(RefreshTokenGuard)
  @Patch()
  update(@GetCurrentUserId() id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(RefreshTokenGuard)
  @Delete()
  remove(@GetCurrentUserId() id: number) {
    return this.usersService.remove(+id);
  }
}
