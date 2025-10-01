import { injectable } from 'inversify';
import { ICompanyTechStackRepository } from '../../../../domain/repositories/company-tech-stack.repository';
import { CompanyTechStack } from '../../../../domain/entities/company-tech-stack.entity';
import { CompanyTechStackModel } from '../models/company-tech-stack.model';
import { Types } from 'mongoose';
import { MongoBaseRepository } from '../../../../shared/base';

@injectable()
export class MongoCompanyTechStackRepository extends MongoBaseRepository<CompanyTechStack> implements ICompanyTechStackRepository {
  constructor() {
    super(CompanyTechStackModel);
  }

  /**
   * Map MongoDB document to CompanyTechStack entity
   */
  protected mapToEntity(doc: any): CompanyTechStack {
    return CompanyTechStack.fromJSON({
      id: doc._id.toString(),
      companyId: doc.companyId.toString(),
      techStack: doc.techStack,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  /**
   * Override create to handle ObjectId conversion
   */
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
    return techStacks.map(techStack => this.mapToEntity(techStack));
  }

  /**
   * Override update to handle ObjectId conversion
   */
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
      { new: true }
    );

    return updatedTechStack ? this.mapToEntity(updatedTechStack) : null;
  }
}

