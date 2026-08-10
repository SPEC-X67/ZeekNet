;
import { CreateCheckoutSessionRequestDto, CreateCheckoutSessionResponseDto } from 'src/application/dtos/company-subscription.dto';;

export interface ICreateCheckoutSessionUseCase {
  execute(data: CreateCheckoutSessionRequestDto): Promise<CreateCheckoutSessionResponseDto>;
}

