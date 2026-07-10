import { IJobCategoryRepository } from 'src/domain/interfaces/repositories/job-category/IJobCategoryRepository';
import { BadRequestError, ConflictError, InternalServerError, NotFoundError } from 'src/domain/errors/errors';
import { IUseCase } from 'src/domain/interfaces/use-cases/base/IUseCase';
import { UpdateJobCategoryRequestDto } from 'src/application/dtos/admin/attributes/job-categories/requests/update-job-category-request.dto';
import { JobCategoryResponseDto } from 'src/application/dtos/admin/attributes/job-categories/responses/job-category-response.dto';
import { JobCategoryMapper } from 'src/application/mappers/job/job-category.mapper';
import { injectable, inject } from 'inversify';
import { TYPES } from 'src/shared/constants/types';
import { ERROR, VALIDATION } from 'src/shared/constants/messages';

@injectable()
export class UpdateJobCategoryUseCase implements IUseCase<{ id: string; dto: UpdateJobCategoryRequestDto }, JobCategoryResponseDto> {
  constructor(@inject(TYPES.JobCategoryRepository) private readonly _jobCategoryRepository: IJobCategoryRepository) {}

  async execute(params: { id: string; dto: UpdateJobCategoryRequestDto }): Promise<JobCategoryResponseDto> {
    const { id, dto } = params;
    const { name } = dto;
    
    if (!name || !name.trim()) {
      throw new BadRequestError(VALIDATION.REQUIRED('Category name'));
    }

    const category = await this._jobCategoryRepository.findById(id);
    if (!category) {
      throw new NotFoundError(ERROR.NOT_FOUND('Category'));
    }

    const normalizedName = name.trim();
    const existingCategory = await this._jobCategoryRepository.findByName(normalizedName);
    
    if (existingCategory && existingCategory.id !== id) {
      throw new ConflictError(ERROR.ALREADY_EXISTS('Category with this name'));
    }

    const updated = await this._jobCategoryRepository.update(id, { name: normalizedName });
    if (!updated) {
      throw new InternalServerError(ERROR.FAILED_TO('update category'));
    }

    return JobCategoryMapper.toResponse(updated);
  }
}
