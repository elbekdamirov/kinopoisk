import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAdminDto } from "src/admin/dto/create-admin.dto";
import { GetCurrentUser, GetCurrentUserId } from "src/common/decorators";
import { ResponseFields } from "src/common/types";
import { Response } from "express";
import { SigninAdminDto } from "src/admin/dto/signin-admin.dto";
import { RefreshTokenAdminGuard, RefreshTokenGuard } from "src/common/guards";

@Controller("admin/auth")
export class AdminAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signupAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.signupAdmin(createAdminDto);
  }

  @Get("verify/:activationLink")
  async verifyAdmin(@Param("activationLink") activationLink: string) {
    return this.authService.verifyAdmin(activationLink);
  }

  @Post("signin")
  async signinAdmin(
    @Body() signinAdminDto: SigninAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signinAdmin(signinAdminDto, res);
  }

  @UseGuards(RefreshTokenAdminGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refreshAdmin(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<ResponseFields> {
    return this.authService.refreshTokensAdmin(+userId, refreshToken, res);
  }

  @UseGuards(RefreshTokenAdminGuard)
  @Post("signout")
  signoutAdmin(
    @GetCurrentUserId() userId: number,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signoutAdmin(+userId, res);
  }

  @Get("approve/:activationLink")
  async approve(@Param("activationLink") activationLink: string) {
    return this.authService.approveAdmin(activationLink);
  }
}
