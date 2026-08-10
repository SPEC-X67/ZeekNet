import { UpdateSubscriptionPlanDto } from 'src/application/dtos/subscription-plan.dto';
import { SubscriptionPlanResponseDto } from 'src/application/dtos/subscription-plan.dto';

export interface IUpdateSubscriptionPlanUseCase {
  execute(data: UpdateSubscriptionPlanDto): Promise<SubscriptionPlanResponseDto>;
}

