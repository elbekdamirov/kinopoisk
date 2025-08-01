import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { MailModule } from "src/mail/mail.module";
import { AccessTokenStrategy } from "src/common/strategies/access-token.strategy";
import { RefreshTokenStrategy } from "src/common/strategies/refresh-token.strategy";

@Module({
  imports: [PrismaModule, JwtModule.register({}), MailModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
