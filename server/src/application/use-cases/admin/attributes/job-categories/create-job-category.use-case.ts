import { IJobCategoryRepository } from 'src/domain/interfaces/repositories/job-category/IJobCategoryRepository';
import { BadRequestError, ConflictError } from 'src/domain/errors/errors';
import { IUseCase } from 'src/domain/interfaces/use-cases/base/IUseCase';
import { CreateJobCategoryRequestDto } from 'src/application/dtos/admin/attributes/job-categories/requests/create-job-category-request.dto';
import { JobCategoryResponseDto } from 'src/application/dtos/admin/attributes/job-categories/responses/job-category-response.dto';
import { JobCategoryMapper } from 'src/application/mappers/job/job-category.mapper';
import { injectable, inject } from 'inversify';
import { TYPES } from 'src/shared/constants/types';
import { ERROR, VALIDATION } from 'src/shared/constants/messages';

@injectable()
export class CreateJobCategoryUseCase implements IUseCase<CreateJobCategoryRequestDto, JobCategoryResponseDto> {
  constructor(@inject(TYPES.JobCategoryRepository) private readonly _jobCategoryRepository: IJobCategoryRepository) {}

  async execute(dto: CreateJobCategoryRequestDto): Promise<JobCategoryResponseDto> {
    const { name } = dto;
    
    if (!name || !name.trim()) {
      throw new BadRequestError(VALIDATION.REQUIRED('Category name'));
    }

    const normalizedName = name.trim();
    const existingCategory = await this._jobCategoryRepository.findByName(normalizedName);
    
    if (existingCategory) {
      throw new ConflictError(ERROR.ALREADY_EXISTS('Category with this name'));
    }

    const category = await this._jobCategoryRepository.create({ name: normalizedName });
    return JobCategoryMapper.toResponse(category);
  }
}
