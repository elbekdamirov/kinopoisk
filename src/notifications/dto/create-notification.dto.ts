export class CreateNotificationDto {
  userId: number;
  title: string;
  message: string;
  isRead?: boolean;
}