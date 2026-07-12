import { ATSOfferResponseDto } from 'src/application/dtos/ats-offer.dto';

export interface IGetOffersByApplicationUseCase {
  execute(applicationId: string): Promise<ATSOfferResponseDto[]>;
}

