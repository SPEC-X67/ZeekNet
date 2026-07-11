import { CreateSubscriptionPlanDto, SubscriptionPlanResponseDto } from 'src/application/dtos/admin/subscription.dto';

export interface ICreateSubscriptionPlanUseCase {
  execute(data: CreateSubscriptionPlanDto): Promise<SubscriptionPlanResponseDto>;
}

