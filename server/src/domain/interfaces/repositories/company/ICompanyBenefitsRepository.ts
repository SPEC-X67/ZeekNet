import { CompanyBenefits } from '../../../entities/company-benefits.entity';
import { IBaseRepository } from '../base.repository';

export interface ICompanyBenefitsRepository extends IBaseRepository<CompanyBenefits> {
  findByCompanyId(companyId: string): Promise<CompanyBenefits[]>;
}
