import { ICompanyBenefitsRepository } from '../../../domain/interfaces/repositories/company-benefits.repository';
import { CompanyBenefits } from '../../../domain/entities/company-benefits.entity';
import { CreateCompanyBenefitsDto, UpdateCompanyBenefitsDto } from '../../dto/company/company-benefits.dto';
import { NotFoundError } from '../../../domain/errors/errors';

export class CompanyBenefitsUseCase {
  constructor(
    private readonly _companyBenefitsRepository: ICompanyBenefitsRepository,
  ) {}

  async createBenefit(companyId: string, data: CreateCompanyBenefitsDto): Promise<CompanyBenefits> {
    const benefit = CompanyBenefits.create({ ...data, companyId });
    return this._companyBenefitsRepository.create(benefit);
  }

  async getBenefitsByCompanyId(companyId: string): Promise<CompanyBenefits[]> {
    return this._companyBenefitsRepository.findByCompanyId(companyId);
  }

  async getBenefitById(benefitId: string): Promise<CompanyBenefits | null> {
    return this._companyBenefitsRepository.findById(benefitId);
  }

  async updateBenefit(benefitId: string, data: UpdateCompanyBenefitsDto): Promise<CompanyBenefits> {
    const existingBenefit = await this._companyBenefitsRepository.findById(benefitId);
    if (!existingBenefit) {
      throw new NotFoundError(`Company benefit with ID ${benefitId} not found`);
    }
    const updatedBenefit = await this._companyBenefitsRepository.update(benefitId, data);
    if (!updatedBenefit) {
      throw new NotFoundError(`Failed to update company benefit with ID ${benefitId}`);
    }
    return updatedBenefit;
  }

  async deleteBenefit(benefitId: string): Promise<void> {
    await this._companyBenefitsRepository.delete(benefitId);
  }
}
