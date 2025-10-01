import { injectable, inject } from 'inversify';
import { ICompanyBenefitsRepository } from '../../../domain/repositories/company-benefits.repository';
import { CompanyBenefits } from '../../../domain/entities/company-benefits.entity';
import { TYPES } from '../../../infrastructure/di/types';
import { CreateCompanyBenefitsDto, UpdateCompanyBenefitsDto } from '../../dto/company/company-benefits.dto';
import { NotFoundError } from '../../../domain/errors/errors';

@injectable()
export class CompanyBenefitsUseCase {
  constructor(
    @inject(TYPES.CompanyBenefitsRepository)
    private readonly companyBenefitsRepository: ICompanyBenefitsRepository,
  ) {}

  async createBenefit(companyId: string, data: CreateCompanyBenefitsDto): Promise<CompanyBenefits> {
    const benefit = CompanyBenefits.create({ ...data, companyId });
    return this.companyBenefitsRepository.create(benefit);
  }

  async getBenefitsByCompanyId(companyId: string): Promise<CompanyBenefits[]> {
    return this.companyBenefitsRepository.findByCompanyId(companyId);
  }

  async getBenefitById(benefitId: string): Promise<CompanyBenefits | null> {
    return this.companyBenefitsRepository.findById(benefitId);
  }

  async updateBenefit(benefitId: string, data: UpdateCompanyBenefitsDto): Promise<CompanyBenefits> {
    const existingBenefit = await this.companyBenefitsRepository.findById(benefitId);
    if (!existingBenefit) {
      throw new NotFoundError(`Company benefit with ID ${benefitId} not found`);
    }
    const updatedBenefit = await this.companyBenefitsRepository.update(benefitId, data);
    if (!updatedBenefit) {
      throw new NotFoundError(`Failed to update company benefit with ID ${benefitId}`);
    }
    return updatedBenefit;
  }

  async deleteBenefit(benefitId: string): Promise<void> {
    await this.companyBenefitsRepository.delete(benefitId);
  }
}
