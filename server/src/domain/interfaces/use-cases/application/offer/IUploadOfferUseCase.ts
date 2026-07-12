import { UploadOfferRequestDto, ATSOfferResponseDto } from 'src/application/dtos/ats-offer.dto';

export interface IUploadOfferUseCase {
  execute(dto: UploadOfferRequestDto): Promise<ATSOfferResponseDto>;
}
