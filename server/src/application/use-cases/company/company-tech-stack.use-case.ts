import { ICompanyTechStackRepository } from '../../../domain/interfaces/repositories';
import { CompanyTechStack } from '../../../domain/entities/company-tech-stack.entity';
import { CreateCompanyTechStackDto, UpdateCompanyTechStackDto } from '../../dto/company/company-tech-stack.dto';
import { NotFoundError } from '../../../domain/errors/errors';

export class CompanyTechStackUseCase {
  constructor(
    private readonly _companyTechStackRepository: ICompanyTechStackRepository,
  ) {}

  async createTechStack(companyId: string, data: CreateCompanyTechStackDto): Promise<CompanyTechStack> {
    const techStack = CompanyTechStack.create({ ...data, companyId });
    return this._companyTechStackRepository.create(techStack);
  }

  async getTechStackByCompanyId(companyId: string): Promise<CompanyTechStack[]> {
    return this._companyTechStackRepository.findByCompanyId(companyId);
  }

  async getTechStackById(techStackId: string): Promise<CompanyTechStack | null> {
    return this._companyTechStackRepository.findById(techStackId);
  }

  async updateTechStack(techStackId: string, data: UpdateCompanyTechStackDto): Promise<CompanyTechStack> {
    const existingTechStack = await this._companyTechStackRepository.findById(techStackId);
    if (!existingTechStack) {
      throw new NotFoundError(`Company tech stack with ID ${techStackId} not found`);
    }
    const updatedTechStack = await this._companyTechStackRepository.update(techStackId, data);
    if (!updatedTechStack) {
      throw new NotFoundError(`Failed to update company tech stack with ID ${techStackId}`);
    }
    return updatedTechStack;
  }

  async deleteTechStack(techStackId: string): Promise<void> {
    await this._companyTechStackRepository.delete(techStackId);
  }
}
