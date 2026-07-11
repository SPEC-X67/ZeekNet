;
import { CreateCheckoutSessionRequestDto, CreateCheckoutSessionResponseDto } from 'src/application/dtos/subscription/subscription.dto';;

export interface ICreateCheckoutSessionUseCase {
  execute(data: CreateCheckoutSessionRequestDto): Promise<CreateCheckoutSessionResponseDto>;
}

