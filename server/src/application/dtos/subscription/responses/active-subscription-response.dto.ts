import { CompanySubscriptionDto } from 'src/application/dtos/admin/subscription/subscription.dto';

export interface ActiveSubscriptionResponseDto extends CompanySubscriptionDto {
  activeJobCount?: number;
}

