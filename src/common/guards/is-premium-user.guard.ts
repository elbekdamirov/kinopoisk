import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PremiumGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.id) {
      throw new ForbiddenException("User not authenticated");
    }

    if (
      user.role &&
      ["admin", "superadmin", "content_manager", "moderator"].includes(
        user.role
      )
    ) {
      return true;
    }

    const activeSubscription = await this.prisma.userSubscription.findFirst({
      where: {
        userId: user.id,
        isActive: true,
        endDate: {
          gte: new Date(),
        },
      },
    });

    if (!activeSubscription) {
      throw new ForbiddenException(
        "Bu faqat premium foydalanuvchilar uchun mavjud"
      );
    }

    return true;
  }
}
