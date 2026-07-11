import { ATSOfferResponseDto, UpdateOfferStatusRequestDto } from 'src/application/dtos/application/offer.dto';

export interface IUpdateOfferStatusUseCase {
  execute(data: UpdateOfferStatusRequestDto): Promise<ATSOfferResponseDto>;
}
