import { CompanyBenefitResponseDto, UpdateCompanyBenefitsRequestDto } from 'src/application/dtos/company-benefit.dto';

export interface IUpdateCompanyBenefitUseCase {
  execute(data: UpdateCompanyBenefitsRequestDto): Promise<CompanyBenefitResponseDto>;
}

