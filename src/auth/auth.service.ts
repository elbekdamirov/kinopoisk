import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import * as uuid from "uuid";
import * as bcrypt from "bcrypt";
import { MailService } from "src/mail/mail.service";
import { SigninUserDto } from "src/users/dto/signin-user.dto";
import { Tokens } from "src/common/types";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService
  ) {}

  private async generateUserTokens(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
      is_active: user.is_active,
      is_premium: user.is_premium,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.USER_ACCESS_TOKEN_KEY,
        expiresIn: process.env.USER_ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.USER_REFRESH_TOKEN_KEY,
        expiresIn: process.env.USER_REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signup(createUserDto: CreateUserDto) {
    const { email, password, confirm_password, full_name, avatar_url } =
      createUserDto;

    const candidate = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (candidate) {
      throw new BadRequestException("This email is already registered");
    }
    if (password !== confirm_password) {
      throw new BadRequestException("Passwords do not match");
    }
    const activationLink = uuid.v4();
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    await this.mailService.sendActivationEmail(email, activationLink);

    const user = await this.prismaService.user.create({
      data: {
        full_name,
        avatar_url,
        email,
        password_hash: hashedPassword,
        activation_link: activationLink,
      },
    });

    return {
      message: "Check your email for activation link",
      email: user.email,
    };
  }

  async verify(activationLink: string) {
    const user = await this.prismaService.user.findFirst({
      where: { activation_link: activationLink },
    });
    if (!user) {
      throw new BadRequestException("Invalid activation link");
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { is_active: true, activation_link: null },
    });

    return {
      message: "Account activated successfully",
      email: user.email,
    };
  }

  async signin(signinUserDto: SigninUserDto, res: Response) {
    const { email, password } = signinUserDto;

    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new BadRequestException("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new BadRequestException("Invalid password");
    }

    if (!user.is_active) {
      throw new BadRequestException("Account is not activated");
    }

    const { accessToken, refreshToken } = await this.generateUserTokens(user);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { refreshToken: hashedRefreshToken },
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.USER_COOKIE_TIME!,
      httpOnly: true,
    });

    return {
      id: user.id,
      accessToken,
    };
  }

  async refreshTokens(userId: number, refreshToken: string, res: Response) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.refreshToken) {
      throw new ForbiddenException("AccessDenied1");
    }

    const rtMatches = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!rtMatches) throw new ForbiddenException("AccessDenied2");

    const tokens: Tokens = await this.generateUserTokens(user);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    await this.prismaService.user.update({
      where: { id: userId },
      data: { refreshToken: hashedRefreshToken },
    });

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: +process.env.USER_COOKIE_TIME!,
      httpOnly: true,
    });

    return {
      message: "Tokenlar yangilandi",
      userId: user.id,
      accessToken: tokens.accessToken,
    };
  }

  async signout(userId: number, res: Response) {
    const user = await this.prismaService.user.updateMany({
      where: {
        id: userId,
        refreshToken: {
          not: null,
        },
      },
      data: {
        refreshToken: null,
      },
    });
    if (!user) throw new ForbiddenException("access denied");
    res.clearCookie("refreshToken");
    return { message: "User signed out" };
  }
}
