import { ICompanyBenefitsRepository } from '../../../../domain/interfaces/repositories/company/ICompanyBenefitsRepository';
import { CompanyBenefits } from '../../../../domain/entities/company-benefits.entity';
import { CompanyBenefitsModel, CompanyBenefitsDocument } from '../models/company-benefits.model';
import { Types } from 'mongoose';
import { RepositoryBase } from '../../../../shared/base';
import { CompanyBenefitsMapper } from '../mappers';

export class CompanyBenefitsRepository extends RepositoryBase<CompanyBenefits, CompanyBenefitsDocument> implements ICompanyBenefitsRepository {
  constructor() {
    super(CompanyBenefitsModel);
  }

  protected mapToEntity(doc: CompanyBenefitsDocument): CompanyBenefits {
    return CompanyBenefitsMapper.toEntity(doc);
  }

  async create(benefit: Omit<CompanyBenefits, 'id' | 'createdAt' | 'updatedAt'>): Promise<CompanyBenefits> {
    const benefitDoc = new CompanyBenefitsModel({
      companyId: new Types.ObjectId(benefit.companyId),
      perk: benefit.perk,
      description: benefit.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedBenefit = await benefitDoc.save();
    return this.mapToEntity(savedBenefit);
  }

  async findByCompanyId(companyId: string): Promise<CompanyBenefits[]> {
    const benefits = await CompanyBenefitsModel.find({ companyId: new Types.ObjectId(companyId) });
    return benefits.map((benefit) => this.mapToEntity(benefit));
  }

  async update(id: string, data: Partial<CompanyBenefits>): Promise<CompanyBenefits | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const updatedBenefit = await CompanyBenefitsModel.findByIdAndUpdate(
      id,
      {
        ...data,
        updatedAt: new Date(),
      },
      { new: true }
    );

    return updatedBenefit ? this.mapToEntity(updatedBenefit) : null;
  }
}
