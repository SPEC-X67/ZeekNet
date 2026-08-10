import { CompanySubscriptionResponseDto } from 'src/application/dtos/company-subscription.dto';;

export interface IRevertToDefaultPlanUseCase {
  execute(companyId: string): Promise<CompanySubscriptionResponseDto>;
}
