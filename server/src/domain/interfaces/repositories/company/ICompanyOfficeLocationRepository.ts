import { CompanyOfficeLocation } from '../../../entities/company-office-location.entity';
import { IBaseRepository } from '../IBaseRepository';

export interface ICompanyOfficeLocationRepository extends IBaseRepository<CompanyOfficeLocation> {
  findByCompanyId(companyId: string): Promise<CompanyOfficeLocation[]>;
}
