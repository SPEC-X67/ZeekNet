import { injectable, inject } from 'inversify';
import { ICompanyTechStackRepository } from '../../../domain/repositories/company-tech-stack.repository';
import { CompanyTechStack } from '../../../domain/entities/company-tech-stack.entity';
import { TYPES } from '../../../infrastructure/di/types';
import { CreateCompanyTechStackDto, UpdateCompanyTechStackDto } from '../../dto/company/company-tech-stack.dto';
import { NotFoundError } from '../../../domain/errors/errors';

@injectable()
export class CompanyTechStackUseCase {
  constructor(
    @inject(TYPES.CompanyTechStackRepository)
    private readonly companyTechStackRepository: ICompanyTechStackRepository,
  ) {}

  async createTechStack(companyId: string, data: CreateCompanyTechStackDto): Promise<CompanyTechStack> {
    const techStack = CompanyTechStack.create({ ...data, companyId });
    return this.companyTechStackRepository.create(techStack);
  }

  async getTechStackByCompanyId(companyId: string): Promise<CompanyTechStack[]> {
    return this.companyTechStackRepository.findByCompanyId(companyId);
  }

  async getTechStackById(techStackId: string): Promise<CompanyTechStack | null> {
    return this.companyTechStackRepository.findById(techStackId);
  }

  async updateTechStack(techStackId: string, data: UpdateCompanyTechStackDto): Promise<CompanyTechStack> {
    const existingTechStack = await this.companyTechStackRepository.findById(techStackId);
    if (!existingTechStack) {
      throw new NotFoundError(`Company tech stack with ID ${techStackId} not found`);
    }
    const updatedTechStack = await this.companyTechStackRepository.update(techStackId, data);
    if (!updatedTechStack) {
      throw new NotFoundError(`Failed to update company tech stack with ID ${techStackId}`);
    }
    return updatedTechStack;
  }

  async deleteTechStack(techStackId: string): Promise<void> {
    await this.companyTechStackRepository.delete(techStackId);
  }
}
