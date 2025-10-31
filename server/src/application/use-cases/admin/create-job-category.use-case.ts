import { IJobCategoryRepository } from '../../../domain/interfaces/repositories/IJobCategoryRepository';
import { JobCategory } from '../../../domain/entities/job-category.entity';
import { ICreateJobCategoryUseCase } from '../../../domain/interfaces/use-cases/IJobCategoryUseCases';
import { AppError } from '../../../domain/errors/errors';

export class CreateJobCategoryUseCase implements ICreateJobCategoryUseCase {
  constructor(private readonly _jobCategoryRepository: IJobCategoryRepository) {}

  async execute(name: string): Promise<JobCategory> {
    if (!name || !name.trim()) {
      throw new AppError('Category name is required', 400);
    }

    const normalizedName = name.trim();
    const existingCategory = await this._jobCategoryRepository.findByName(normalizedName);
    
    if (existingCategory) {
      throw new AppError('Category with this name already exists', 409);
    }

    return await this._jobCategoryRepository.create({ name: normalizedName });
  }
}