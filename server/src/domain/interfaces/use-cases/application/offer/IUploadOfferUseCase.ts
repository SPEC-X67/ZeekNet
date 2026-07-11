import { UploadOfferRequestDto, ATSOfferResponseDto } from 'src/application/dtos/application/offer.dto';

export interface IUploadOfferUseCase {
  execute(dto: UploadOfferRequestDto): Promise<ATSOfferResponseDto>;
}
