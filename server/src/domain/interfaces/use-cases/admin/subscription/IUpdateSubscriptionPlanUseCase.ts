import { UpdateSubscriptionPlanDto, SubscriptionPlanResponseDto } from 'src/application/dtos/admin/subscription.dto';

export interface IUpdateSubscriptionPlanUseCase {
  execute(data: UpdateSubscriptionPlanDto): Promise<SubscriptionPlanResponseDto>;
}

