import { CompanySubscriptionResponseDto } from 'src/application/dtos/company-subscription.dto';;

export interface IResumeSubscriptionUseCase {
  execute(userId: string): Promise<CompanySubscriptionResponseDto>;
}
