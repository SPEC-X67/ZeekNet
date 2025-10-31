import { ICompanyTechStackRepository } from '../../../../domain/interfaces/repositories/company/ICompanyTechStackRepository';
import { CompanyTechStack } from '../../../../domain/entities/company-tech-stack.entity';
import { CompanyTechStackModel, CompanyTechStackDocument } from '../models/company-tech-stack.model';
import { Types } from 'mongoose';
import { CompanyTechStackMapper } from '../mappers/company-tech-stack.mapper';
import { RepositoryBase } from './base-repository';

export class CompanyTechStackRepository extends RepositoryBase<CompanyTechStack, CompanyTechStackDocument> implements ICompanyTechStackRepository {
  constructor() {
    super(CompanyTechStackModel);
  }

  protected mapToEntity(doc: CompanyTechStackDocument): CompanyTechStack {
    return CompanyTechStackMapper.toEntity(doc);
  }

  protected convertToObjectIds(data: Partial<CompanyTechStack>): Partial<CompanyTechStack> {
    const converted = { ...data };
    if (converted.companyId && typeof converted.companyId === 'string') {
      (converted as Record<string, unknown>).companyId = new Types.ObjectId(converted.companyId);
    }
    return converted;
  }

  async findByCompanyId(companyId: string): Promise<CompanyTechStack[]> {
    return await this.findMany({ companyId: new Types.ObjectId(companyId) });
  }
}