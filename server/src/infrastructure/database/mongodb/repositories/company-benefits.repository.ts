import { ICompanyBenefitsRepository } from '../../../../domain/interfaces/repositories/company-benefits.repository';
import { CompanyBenefits } from '../../../../domain/entities/company-benefits.entity';
import { CompanyBenefitsModel } from '../models/company-benefits.model';
import { Types } from 'mongoose';
import { MongoBaseRepository } from '../../../../shared/base';

export class MongoCompanyBenefitsRepository extends MongoBaseRepository<CompanyBenefits> implements ICompanyBenefitsRepository {
  constructor() {
    super(CompanyBenefitsModel);
  }

  /**
   * Map MongoDB document to CompanyBenefits entity
   */
  protected mapToEntity(doc: any): CompanyBenefits {
    return CompanyBenefits.fromJSON({
      id: doc._id.toString(),
      companyId: doc.companyId.toString(),
      perk: doc.perk,
      description: doc.description,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  /**
   * Override create to handle ObjectId conversion
   */
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
    return benefits.map(benefit => this.mapToEntity(benefit));
  }

  /**
   * Override update to handle ObjectId conversion
   */
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

