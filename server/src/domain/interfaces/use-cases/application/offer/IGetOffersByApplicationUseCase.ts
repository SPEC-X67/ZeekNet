import { ATSOfferResponseDto } from 'src/application/dtos/application/offer.dto';

export interface IGetOffersByApplicationUseCase {
  execute(applicationId: string): Promise<ATSOfferResponseDto[]>;
}

