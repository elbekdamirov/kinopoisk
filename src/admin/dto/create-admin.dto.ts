import { Role } from "generated/prisma";

export class CreateAdminDto {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  avatar_url?: string;
  role?: Role;
  is_active?: boolean;
  is_approved?: boolean;
}
