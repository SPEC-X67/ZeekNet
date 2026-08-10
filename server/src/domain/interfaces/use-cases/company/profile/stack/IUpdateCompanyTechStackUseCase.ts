import { CompanyTechStackResponseDto, UpdateCompanyTechStackRequestDto } from 'src/application/dtos/company-tech-stack.dto';

export interface IUpdateCompanyTechStackUseCase {
  execute(dto: UpdateCompanyTechStackRequestDto): Promise<CompanyTechStackResponseDto>;
}

