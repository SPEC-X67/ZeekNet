import { ICompanyTechStackRepository } from '../../../domain/interfaces/repositories';
import { CompanyTechStack } from '../../../domain/entities/company-tech-stack.entity';
import { CreateCompanyTechStackRequestDto } from '../../dto/company/company-tech-stack.dto';
import { ICreateCompanyTechStackUseCase } from '../../../domain/interfaces/use-cases';

export class CreateCompanyTechStackUseCase implements ICreateCompanyTechStackUseCase {
  constructor(private readonly _companyTechStackRepository: ICompanyTechStackRepository) {}

  async execute(companyId: string, data: CreateCompanyTechStackRequestDto): Promise<CompanyTechStack> {
    const techStack = CompanyTechStack.create({ ...data, companyId });
    return this._companyTechStackRepository.create(techStack);
  }
}

