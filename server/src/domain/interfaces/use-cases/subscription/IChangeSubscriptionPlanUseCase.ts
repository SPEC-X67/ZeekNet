import { ChangeSubscriptionPlanRequestDto } from 'src/application/dtos/company-subscription.dto';;
import { ChangeSubscriptionResult } from 'src/application/dtos/company-subscription.dto';

export interface IChangeSubscriptionPlanUseCase {
  execute(data: ChangeSubscriptionPlanRequestDto): Promise<ChangeSubscriptionResult>;
}

