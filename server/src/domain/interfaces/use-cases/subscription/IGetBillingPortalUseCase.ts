import { GetBillingPortalRequestDto } from 'src/application/dtos/company-subscription.dto';;

export interface IGetBillingPortalUseCase {
  execute(data: GetBillingPortalRequestDto): Promise<{ url: string; }>;
}

