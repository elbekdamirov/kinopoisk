import { PartialType } from '@nestjs/swagger';
import { CreateUserSubscriptionDto } from './create-user-subscription.dto';

export class UpdateUserSubscriptionDto extends PartialType(CreateUserSubscriptionDto) {}
