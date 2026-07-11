import { GetAllPaymentOrdersRequestDto, GetAllPaymentOrdersResponseDto } from 'src/application/dtos/admin/payment.dto';


export interface IGetAllPaymentOrdersUseCase {
  execute(query: GetAllPaymentOrdersRequestDto): Promise<GetAllPaymentOrdersResponseDto>;
}

