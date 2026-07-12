import { ATSOfferResponseDto, UpdateOfferStatusRequestDto } from 'src/application/dtos/ats-offer.dto';

export interface IUpdateOfferStatusUseCase {
  execute(data: UpdateOfferStatusRequestDto): Promise<ATSOfferResponseDto>;
}
