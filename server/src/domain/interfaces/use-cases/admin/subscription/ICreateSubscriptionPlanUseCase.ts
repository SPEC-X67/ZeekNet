import { CreateSubscriptionPlanDto, SubscriptionPlanResponseDto } from 'src/application/dtos/admin/subscription/subscription.dto';

export interface ICreateSubscriptionPlanUseCase {
  execute(data: CreateSubscriptionPlanDto): Promise<SubscriptionPlanResponseDto>;
}

