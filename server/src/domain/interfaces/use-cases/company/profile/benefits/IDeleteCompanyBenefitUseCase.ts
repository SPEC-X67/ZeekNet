import { DeleteCompanyBenefitsRequestDto } from 'src/application/dtos/company-benefit.dto';

export interface IDeleteCompanyBenefitUseCase {
  execute(dto: DeleteCompanyBenefitsRequestDto): Promise<void>;
}
