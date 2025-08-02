import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { MailModule } from "src/mail/mail.module";
import { AccessTokenStrategy } from "src/common/strategies/access-token.strategy";
import { RefreshTokenStrategy } from "src/common/strategies/refresh-token.strategy";
import { AdminAuthController } from "./admin-auth.controller";
import { AccessTokenAdminStrategy } from "src/common/strategies/access-token-admin.strategy";
import { RefreshTokenAdminStrategy } from "src/common/strategies/refresh-token-admin.strategy";

@Module({
  imports: [PrismaModule, JwtModule.register({}), MailModule],
  controllers: [AuthController, AdminAuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AccessTokenAdminStrategy,
    RefreshTokenAdminStrategy,
  ],
})
export class AuthModule {}
