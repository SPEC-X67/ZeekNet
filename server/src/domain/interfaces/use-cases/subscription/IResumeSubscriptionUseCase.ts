import { CompanySubscriptionResponseDto } from 'src/application/dtos/subscription/subscription.dto';;

export interface IResumeSubscriptionUseCase {
  execute(userId: string): Promise<CompanySubscriptionResponseDto>;
}
