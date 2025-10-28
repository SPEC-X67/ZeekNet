import { ICompanyTechStackRepository } from '../../../domain/interfaces/repositories';
import { CompanyTechStack } from '../../../domain/entities/company-tech-stack.entity';
import { IGetCompanyTechStackUseCase } from '../../../domain/interfaces/use-cases';

export class GetCompanyTechStackUseCase implements IGetCompanyTechStackUseCase {
  constructor(private readonly _companyTechStackRepository: ICompanyTechStackRepository) {}

  async executeByCompanyId(companyId: string): Promise<CompanyTechStack[]> {
    return this._companyTechStackRepository.findByCompanyId(companyId);
  }

  async executeById(techStackId: string): Promise<CompanyTechStack | null> {
    return this._companyTechStackRepository.findById(techStackId);
  }
}

