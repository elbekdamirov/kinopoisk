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
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { SigninUserDto } from "src/users/dto/signin-user.dto";
import { AccessTokenGuard, RefreshTokenGuard } from "src/common/guards";
import { GetCurrentUser, GetCurrentUserId } from "src/common/decorators";
import { ResponseFields } from "src/common/types";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Get("verify/:activationLink")
  async verify(@Param("activationLink") activationLink: string) {
    return this.authService.verify(activationLink);
  }

  @Post("signin")
  async signin(
    @Body() signinUserDto: SigninUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signin(signinUserDto, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refresh(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<ResponseFields> {
    return this.authService.refreshTokens(+userId, refreshToken, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Post("signout")
  signout(
    @GetCurrentUserId() userId: number,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signout(+userId, res);
  }
}
