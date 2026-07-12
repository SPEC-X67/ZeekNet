import { CreateSubscriptionPlanDto } from 'src/application/dtos/subscription-plan.dto';
import { SubscriptionPlanResponseDto } from 'src/application/dtos/subscription-plan.dto';

export interface ICreateSubscriptionPlanUseCase {
  execute(data: CreateSubscriptionPlanDto): Promise<SubscriptionPlanResponseDto>;
}

