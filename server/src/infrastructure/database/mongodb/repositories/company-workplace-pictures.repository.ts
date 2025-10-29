import { ICompanyWorkplacePicturesRepository } from '../../../../domain/interfaces/repositories/company/ICompanyWorkplacePicturesRepository';
import { CompanyWorkplacePictures } from '../../../../domain/entities/company-workplace-pictures.entity';
import { CompanyWorkplacePicturesModel, CompanyWorkplacePicturesDocument } from '../models/company-workplace-pictures.model';
import { Types } from 'mongoose';
import { CompanyWorkplacePicturesMapper } from '../mappers/company-workplace-pictures.mapper';
import { RepositoryBase } from './base-repository';

export class CompanyWorkplacePicturesRepository extends RepositoryBase<CompanyWorkplacePictures, CompanyWorkplacePicturesDocument> implements ICompanyWorkplacePicturesRepository {
  constructor() {
    super(CompanyWorkplacePicturesModel);
  }

  protected mapToEntity(doc: CompanyWorkplacePicturesDocument): CompanyWorkplacePictures {
    return CompanyWorkplacePicturesMapper.toEntity(doc);
  }

  protected convertToObjectIds(data: Partial<CompanyWorkplacePictures>): Partial<CompanyWorkplacePictures> {
    const converted = { ...data };
    if (converted.companyId && typeof converted.companyId === 'string') {
      (converted as Record<string, unknown>).companyId = new Types.ObjectId(converted.companyId);
    }
    return converted;
  }

  async findByCompanyId(companyId: string): Promise<CompanyWorkplacePictures[]> {
    return await this.findMany({ companyId: new Types.ObjectId(companyId) });
  }
}
