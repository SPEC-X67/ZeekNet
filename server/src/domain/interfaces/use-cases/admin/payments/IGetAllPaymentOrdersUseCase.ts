import { GetAllPaymentOrdersRequestDto, GetAllPaymentOrdersResponseDto } from 'src/application/dtos/payment.dto';

export interface IGetAllPaymentOrdersUseCase {
  execute(query: GetAllPaymentOrdersRequestDto): Promise<GetAllPaymentOrdersResponseDto>;
}

