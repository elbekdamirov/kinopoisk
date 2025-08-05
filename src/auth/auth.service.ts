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
import { CreateAdminDto } from "src/admin/dto/create-admin.dto";

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

  // -----------------------   Admin Auth -----------------------/

  private async generateAdminTokens(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
      is_active: user.is_active,
      is_approved: user.is_approved,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ADMIN_ACCESS_TOKEN_KEY,
        expiresIn: process.env.ADMIN_ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.ADMIN_REFRESH_TOKEN_KEY,
        expiresIn: process.env.ADMIN_REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signupAdmin(createAdminDto: CreateAdminDto) {
    const { email, password, confirm_password, full_name, avatar_url, role } =
      createAdminDto;

    const candidate = await this.prismaService.admin.findUnique({
      where: { email },
    });
    if (candidate) {
      throw new BadRequestException("This email is already registered");
    }
    if (password !== confirm_password) {
      throw new BadRequestException("Passwords do not match");
    }
    const activationLink = uuid.v4();
    const approvalLink = uuid.v4();
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.mailService.sendActivationEmailToAdmin(email, activationLink);

    const user = await this.prismaService.admin.create({
      data: {
        full_name,
        avatar_url,
        email,
        role: role,
        password_hash: hashedPassword,
        activation_link: activationLink,
        approval_link: approvalLink,
      },
    });

    await this.mailService.sendApprovalLinkToSuperadmin(user, approvalLink);

    return {
      message: "Check your email for activation link",
      email: user.email,
    };
  }

  async verifyAdmin(activationLink: string) {
    const user = await this.prismaService.admin.findFirst({
      where: { activation_link: activationLink },
    });
    if (!user) {
      throw new BadRequestException("Invalid activation link");
    }

    await this.prismaService.admin.update({
      where: { id: user.id },
      data: { is_active: true, activation_link: null },
    });

    return {
      message: "Account activated successfully",
      email: user.email,
    };
  }

  async signinAdmin(signinAdminDto: SigninUserDto, res: Response) {
    const { email, password } = signinAdminDto;

    const user = await this.prismaService.admin.findUnique({
      where: { email },
    });
    if (!user) {
      throw new BadRequestException("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new BadRequestException("Incorrect password");
    }

    if (!user.is_approved) {
      throw new ForbiddenException(
        "Admin hali superadmin tomonidan tasdiqlanmagan."
      );
    }

    if (!user.is_active) {
      throw new BadRequestException("Account is not activated");
    }

    const { accessToken, refreshToken } = await this.generateAdminTokens(user);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);

    await this.prismaService.admin.update({
      where: { id: user.id },
      data: { refreshToken: hashedRefreshToken },
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.ADMIN_COOKIE_TIME!,
      httpOnly: true,
    });

    return {
      id: user.id,
      accessToken,
    };
  }

  async refreshTokensAdmin(
    userId: number,
    refreshToken: string,
    res: Response
  ) {
    const user = await this.prismaService.admin.findUnique({
      where: { id: userId },
    });

    if (!user || !user.refreshToken) {
      throw new ForbiddenException("AccessDenied1");
    }

    const rtMatches = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!rtMatches) throw new ForbiddenException("AccessDenied2");

    const tokens: Tokens = await this.generateAdminTokens(user);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    await this.prismaService.admin.update({
      where: { id: userId },
      data: { refreshToken: hashedRefreshToken },
    });

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: +process.env.ADMIN_COOKIE_TIME!,
      httpOnly: true,
    });

    return {
      message: "Tokenlar yangilandi",
      userId: user.id,
      accessToken: tokens.accessToken,
    };
  }

  async signoutAdmin(userId: number, res: Response) {
    const user = await this.prismaService.admin.updateMany({
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
    if (!user) throw new ForbiddenException("Access denied");
    res.clearCookie("refreshToken");
    return { message: "User signed out" };
  }

  async approveAdmin(activationLink: string) {
    const user = await this.prismaService.admin.findFirst({
      where: { approval_link: activationLink },
    });
    if (!user) {
      throw new BadRequestException("Invalid activation link");
    }

    await this.prismaService.admin.update({
      where: { id: user.id },
      data: { is_approved: true, approval_link: null },
    });

    return {
      message: "Account activated successfully",
      email: user.email,
    };
  }
}
