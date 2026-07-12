import { DeleteCompanyTechStackRequestDto } from 'src/application/dtos/company-tech-stack.dto';

export interface IDeleteCompanyTechStackUseCase {
  execute(dto: DeleteCompanyTechStackRequestDto): Promise<void>;
}
