import { CompanyTechStack } from '../../../../domain/entities/company-tech-stack.entity';
import { CompanyTechStackDocument } from '../models/company-tech-stack.model';

export class CompanyTechStackMapper {
  static toEntity(doc: CompanyTechStackDocument): CompanyTechStack {
    return CompanyTechStack.fromJSON({
      id: String(doc._id),
      companyId: doc.companyId.toString(),
      techStack: doc.techStack,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
}