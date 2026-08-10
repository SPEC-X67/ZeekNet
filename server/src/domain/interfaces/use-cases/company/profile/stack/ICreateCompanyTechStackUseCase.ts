import { CompanyTechStackResponseDto, CreateCompanyTechStackRequestDto } from 'src/application/dtos/company-tech-stack.dto';

export interface ICreateCompanyTechStackUseCase {
  execute(data: CreateCompanyTechStackRequestDto): Promise<CompanyTechStackResponseDto>;
}

