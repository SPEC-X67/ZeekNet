import { injectable } from 'inversify';
import { ICompanyTechStackRepository } from '../../../../domain/repositories/company-tech-stack.repository';
import { CompanyTechStack } from '../../../../domain/entities/company-tech-stack.entity';
import { CompanyTechStackModel } from '../models/company-tech-stack.model';
import { Types } from 'mongoose';

@injectable()
export class MongoCompanyTechStackRepository implements ICompanyTechStackRepository {
  async create(techStack: CompanyTechStack): Promise<CompanyTechStack> {
    const techStackDoc = new CompanyTechStackModel({
      companyId: new Types.ObjectId(techStack.companyId),
      techStack: techStack.techStack,
    });

    const savedTechStack = await techStackDoc.save();
    return this.mapDocumentToEntity(savedTechStack);
  }

  async findById(id: string): Promise<CompanyTechStack | null> {
    const techStack = await CompanyTechStackModel.findById(id);
    return techStack ? this.mapDocumentToEntity(techStack) : null;
  }

  async findByCompanyId(companyId: string): Promise<CompanyTechStack[]> {
    const techStacks = await CompanyTechStackModel.find({ companyId: new Types.ObjectId(companyId) });
    return techStacks.map(techStack => this.mapDocumentToEntity(techStack));
  }

  async update(techStack: CompanyTechStack): Promise<CompanyTechStack> {
    const updatedTechStack = await CompanyTechStackModel.findByIdAndUpdate(
      techStack.id,
      {
        techStack: techStack.techStack,
      },
      { new: true }
    );

    if (!updatedTechStack) {
      throw new Error('Tech stack not found');
    }

    return this.mapDocumentToEntity(updatedTechStack);
  }

  async delete(id: string): Promise<void> {
    await CompanyTechStackModel.findByIdAndDelete(id);
  }

  private mapDocumentToEntity(doc: any): CompanyTechStack {
    return CompanyTechStack.fromJSON({
      id: doc._id.toString(),
      companyId: doc.companyId.toString(),
      techStack: doc.techStack,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
}

