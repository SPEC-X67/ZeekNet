import { GetAllPaymentOrdersRequestDto, GetAllPaymentOrdersResponseDto } from 'src/application/dtos/admin/payments/payment.dto';


export interface IGetAllPaymentOrdersUseCase {
  execute(query: GetAllPaymentOrdersRequestDto): Promise<GetAllPaymentOrdersResponseDto>;
}

