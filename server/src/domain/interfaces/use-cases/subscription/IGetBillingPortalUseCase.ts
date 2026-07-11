import { GetBillingPortalRequestDto } from 'src/application/dtos/subscription/subscription.dto';;

export interface IGetBillingPortalUseCase {
  execute(data: GetBillingPortalRequestDto): Promise<{ url: string; }>;
}

