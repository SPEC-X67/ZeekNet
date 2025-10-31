import { ICompanyBenefitsRepository } from '../../../../domain/interfaces/repositories/company/ICompanyBenefitsRepository';
import { CompanyBenefits } from '../../../../domain/entities/company-benefits.entity';
import { CompanyBenefitsModel, CompanyBenefitsDocument } from '../models/company-benefits.model';
import { Types } from 'mongoose';
import { CompanyBenefitsMapper } from '../mappers/company-benefits.mapper';
import { RepositoryBase } from './base-repository';

export class CompanyBenefitsRepository extends RepositoryBase<CompanyBenefits, CompanyBenefitsDocument> implements ICompanyBenefitsRepository {
  constructor() {
    super(CompanyBenefitsModel);
  }

  protected mapToEntity(doc: CompanyBenefitsDocument): CompanyBenefits {
    return CompanyBenefitsMapper.toEntity(doc);
  }

  protected convertToObjectIds(data: Partial<CompanyBenefits>): Partial<CompanyBenefits> {
    const converted = { ...data };
    if (converted.companyId && typeof converted.companyId === 'string') {
      (converted as Record<string, unknown>).companyId = new Types.ObjectId(converted.companyId);
    }
    return converted;
  }

  async findByCompanyId(companyId: string): Promise<CompanyBenefits[]> {
    return await this.findMany({ companyId: new Types.ObjectId(companyId) });
  }
}