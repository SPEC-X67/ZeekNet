import { CompanyBenefitResponseDto, CreateCompanyBenefitsRequestDto } from 'src/application/dtos/company-benefit.dto';

export interface ICreateCompanyBenefitUseCase {
  execute(data: CreateCompanyBenefitsRequestDto): Promise<CompanyBenefitResponseDto>;
}

