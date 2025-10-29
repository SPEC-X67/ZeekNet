import { ICompanyOfficeLocationRepository } from '../../../../domain/interfaces/repositories/company/ICompanyOfficeLocationRepository';
import { CompanyOfficeLocation } from '../../../../domain/entities/company-office-location.entity';
import { CompanyOfficeLocationModel, CompanyOfficeLocationDocument } from '../models/company-office-location.model';
import { Types } from 'mongoose';
import { CompanyOfficeLocationMapper } from '../mappers/company-office-location.mapper';
import { RepositoryBase } from './base-repository';

export class CompanyOfficeLocationRepository extends RepositoryBase<CompanyOfficeLocation, CompanyOfficeLocationDocument> implements ICompanyOfficeLocationRepository {
  constructor() {
    super(CompanyOfficeLocationModel);
  }

  protected mapToEntity(doc: CompanyOfficeLocationDocument): CompanyOfficeLocation {
    return CompanyOfficeLocationMapper.toEntity(doc);
  }

  protected convertToObjectIds(data: Partial<CompanyOfficeLocation>): Partial<CompanyOfficeLocation> {
    const converted = { ...data };
    if (converted.companyId && typeof converted.companyId === 'string') {
      (converted as Record<string, unknown>).companyId = new Types.ObjectId(converted.companyId);
    }
    return converted;
  }

  async findByCompanyId(companyId: string): Promise<CompanyOfficeLocation[]> {
    return await this.findMany({ companyId: new Types.ObjectId(companyId) });
  }
}
