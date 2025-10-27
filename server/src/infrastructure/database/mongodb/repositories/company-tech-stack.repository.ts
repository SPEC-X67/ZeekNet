import { ICompanyTechStackRepository } from '../../../../domain/interfaces/repositories/company/ICompanyTechStackRepository';
import { CompanyTechStack } from '../../../../domain/entities/company-tech-stack.entity';
import { CompanyTechStackModel, CompanyTechStackDocument } from '../models/company-tech-stack.model';
import { Types } from 'mongoose';
import { CompanyTechStackMapper } from '../mappers';
import { RepositoryBase } from './base-repository';

export class CompanyTechStackRepository extends RepositoryBase<CompanyTechStack, CompanyTechStackDocument> implements ICompanyTechStackRepository {
  constructor() {
    super(CompanyTechStackModel);
  }

  protected mapToEntity(doc: CompanyTechStackDocument): CompanyTechStack {
    return CompanyTechStackMapper.toEntity(doc);
  }

  async create(techStack: Omit<CompanyTechStack, 'id' | 'createdAt' | 'updatedAt'>): Promise<CompanyTechStack> {
    const techStackDoc = new CompanyTechStackModel({
      companyId: new Types.ObjectId(techStack.companyId),
      techStack: techStack.techStack,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedTechStack = await techStackDoc.save();
    return this.mapToEntity(savedTechStack);
  }

  async findByCompanyId(companyId: string): Promise<CompanyTechStack[]> {
    const techStacks = await CompanyTechStackModel.find({ companyId: new Types.ObjectId(companyId) });
    return techStacks.map((techStack) => this.mapToEntity(techStack));
  }

  async update(id: string, data: Partial<CompanyTechStack>): Promise<CompanyTechStack | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const updatedTechStack = await CompanyTechStackModel.findByIdAndUpdate(
      id,
      {
        ...data,
        updatedAt: new Date(),
      },
      { new: true },
    );

    return updatedTechStack ? this.mapToEntity(updatedTechStack) : null;
  }
}
