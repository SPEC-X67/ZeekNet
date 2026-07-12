import { CompanyBenefitResponseDto, GetCompanyBenefitsRequestDto } from 'src/application/dtos/company-benefit.dto';

export interface IGetCompanyBenefitUseCase {
  execute(dto: GetCompanyBenefitsRequestDto): Promise<CompanyBenefitResponseDto[]>;
}
