export class CreateSubscriptionDto {
  name: string;
  info: string;
  price: number;
  duration: number;
  is_active?: boolean;
}
