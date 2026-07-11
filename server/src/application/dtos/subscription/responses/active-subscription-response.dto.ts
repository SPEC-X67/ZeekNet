import { CompanySubscriptionDto } from 'src/application/dtos/admin/subscription.dto';

export interface ActiveSubscriptionResponseDto extends CompanySubscriptionDto {
  activeJobCount?: number;
}

