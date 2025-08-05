// // guards/is-premium.guard.ts
// import {
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
//   Injectable,
// } from "@nestjs/common";
// import { PrismaService } from "src/prisma/prisma.service";

// @Injectable()
// export class IsPremiumGuard implements CanActivate {
//   constructor(private readonly prisma: PrismaService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const req = context.switchToHttp().getRequest();
//     const userId = req.user?.id;

//     if (!userId) {
//       throw new ForbiddenException("Foydalanuvchi aniqlanmadi");
//     }

//     const activePayment = await this.prisma.payment.findFirst({
//       where: {
//         userId,
//         status: "success",
//         Subscription: {
//           : {
//             gt: new Date(),
//           },
//         },
//       },
//       include: {
//         Subscription: true,
//       },
//     });

//     if (!activePayment) {
//       throw new ForbiddenException("Premium obuna talab qilinadi");
//     }

//     return true;
//   }
// }
