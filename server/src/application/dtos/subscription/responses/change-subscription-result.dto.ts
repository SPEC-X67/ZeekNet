import { CompanySubscriptionDto } from 'src/application/dtos/admin/subscription.dto';

export interface ChangeSubscriptionResult {
  subscription: CompanySubscriptionDto;
  prorationAmount?: number;
}

