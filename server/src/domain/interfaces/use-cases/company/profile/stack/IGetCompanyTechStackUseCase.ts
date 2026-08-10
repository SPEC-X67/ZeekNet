import { CompanyTechStackResponseDto, GetCompanyTechStackRequestDto } from 'src/application/dtos/company-tech-stack.dto';

export interface IGetCompanyTechStackUseCase {
  execute(dto: GetCompanyTechStackRequestDto): Promise<CompanyTechStackResponseDto[]>;
}
