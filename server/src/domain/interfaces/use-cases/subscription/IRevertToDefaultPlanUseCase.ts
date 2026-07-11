import { CompanySubscriptionResponseDto } from 'src/application/dtos/subscription/subscription.dto';;

export interface IRevertToDefaultPlanUseCase {
  execute(companyId: string): Promise<CompanySubscriptionResponseDto>;
}
