import { CompanyTechStack } from '../../../entities/company-tech-stack.entity';
import { IBaseRepository } from '../base.repository';

export interface ICompanyTechStackRepository extends IBaseRepository<CompanyTechStack> {
  findByCompanyId(companyId: string): Promise<CompanyTechStack[]>;
}
