import { ICompanyBenefitsRepository } from '../../../domain/interfaces/repositories';
import { CompanyBenefits } from '../../../domain/entities/company-benefits.entity';
import { IGetCompanyBenefitUseCase } from '../../../domain/interfaces/use-cases';

export class GetCompanyBenefitUseCase implements IGetCompanyBenefitUseCase {
  constructor(private readonly _companyBenefitsRepository: ICompanyBenefitsRepository) {}

  async executeByCompanyId(companyId: string): Promise<CompanyBenefits[]> {
    return this._companyBenefitsRepository.findByCompanyId(companyId);
  }

  async executeById(benefitId: string): Promise<CompanyBenefits | null> {
    return this._companyBenefitsRepository.findById(benefitId);
  }
}

