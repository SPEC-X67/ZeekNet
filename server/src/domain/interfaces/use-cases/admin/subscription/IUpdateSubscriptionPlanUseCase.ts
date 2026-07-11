import { UpdateSubscriptionPlanDto, SubscriptionPlanResponseDto } from 'src/application/dtos/admin/subscription/subscription.dto';

export interface IUpdateSubscriptionPlanUseCase {
  execute(data: UpdateSubscriptionPlanDto): Promise<SubscriptionPlanResponseDto>;
}

