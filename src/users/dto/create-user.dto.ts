export class CreateUserDto {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  avatar_url?: string;
}
