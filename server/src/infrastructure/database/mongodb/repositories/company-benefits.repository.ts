import { injectable } from 'inversify';
import { ICompanyBenefitsRepository } from '../../../../domain/repositories/company-benefits.repository';
import { CompanyBenefits } from '../../../../domain/entities/company-benefits.entity';
import { CompanyBenefitsModel } from '../models/company-benefits.model';
import { Types } from 'mongoose';

@injectable()
export class MongoCompanyBenefitsRepository implements ICompanyBenefitsRepository {
  async create(benefit: CompanyBenefits): Promise<CompanyBenefits> {
    const benefitDoc = new CompanyBenefitsModel({
      companyId: new Types.ObjectId(benefit.companyId),
      perk: benefit.perk,
      description: benefit.description,
    });

    const savedBenefit = await benefitDoc.save();
    return this.mapDocumentToEntity(savedBenefit);
  }

  async findById(id: string): Promise<CompanyBenefits | null> {
    const benefit = await CompanyBenefitsModel.findById(id);
    return benefit ? this.mapDocumentToEntity(benefit) : null;
  }

  async findByCompanyId(companyId: string): Promise<CompanyBenefits[]> {
    const benefits = await CompanyBenefitsModel.find({ companyId: new Types.ObjectId(companyId) });
    return benefits.map(benefit => this.mapDocumentToEntity(benefit));
  }

  async update(benefit: CompanyBenefits): Promise<CompanyBenefits> {
    const updatedBenefit = await CompanyBenefitsModel.findByIdAndUpdate(
      benefit.id,
      {
        perk: benefit.perk,
        description: benefit.description,
      },
      { new: true }
    );

    if (!updatedBenefit) {
      throw new Error('Benefit not found');
    }

    return this.mapDocumentToEntity(updatedBenefit);
  }

  async delete(id: string): Promise<void> {
    await CompanyBenefitsModel.findByIdAndDelete(id);
  }

  private mapDocumentToEntity(doc: any): CompanyBenefits {
    return CompanyBenefits.fromJSON({
      id: doc._id.toString(),
      companyId: doc.companyId.toString(),
      perk: doc.perk,
      description: doc.description,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
}

