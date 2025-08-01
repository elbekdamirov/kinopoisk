import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import * as bcrypt from "bcrypt";
import { Role } from "generated/prisma";

@Injectable()
export class AdminsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);

    return this.prisma.admin.create({
      data: {
        ...createAdminDto,
        password_hash: hashedPassword,
        role: createAdminDto.role?.toLowerCase() as Role,
      },
    });
  }

  findAll() {
    return this.prisma.admin.findMany();
  }

  async findOne(id: number) {
    const admin = await this.prisma.admin.findUnique({ where: { id } });
    if (!admin) throw new NotFoundException(`Admin with ID ${id} not found`);
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    await this.findOne(id);

    if (updateAdminDto.password) {
      updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 10);
    }

    return this.prisma.admin.update({
      where: { id },
      data: {
        ...updateAdminDto,
        role: updateAdminDto.role?.toLowerCase() as Role,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.admin.delete({ where: { id } });
  }
}
