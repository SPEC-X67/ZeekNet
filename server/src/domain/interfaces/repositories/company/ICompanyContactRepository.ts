import { CompanyContact } from '../../../entities/company-contact.entity';
import { IBaseRepository } from '../base.repository';

export interface ICompanyContactRepository extends IBaseRepository<CompanyContact> {
  findByCompanyId(companyId: string): Promise<CompanyContact | null>;
  existsByCompanyId(companyId: string): Promise<boolean>;
}
