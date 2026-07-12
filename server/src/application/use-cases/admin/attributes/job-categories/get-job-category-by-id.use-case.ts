import { IJobCategoryRepository } from 'src/domain/interfaces/repositories/job-category/IJobCategoryRepository';
import { NotFoundError } from 'src/domain/errors/errors';
import { IUseCase } from 'src/domain/interfaces/use-cases/base/IUseCase';
import { JobCategoryResponseDto } from 'src/application/dtos/job-category.dto';
import { JobCategoryMapper } from 'src/application/mappers/job/job-category.mapper';
import { injectable, inject } from 'inversify';
import { TYPES } from 'src/shared/constants/types';
import { ERROR } from 'src/shared/constants/messages';

@injectable()
export class GetJobCategoryByIdUseCase implements IUseCase<string, JobCategoryResponseDto> {
  constructor(@inject(TYPES.JobCategoryRepository) private readonly _jobCategoryRepository: IJobCategoryRepository) {}

  async execute(id: string): Promise<JobCategoryResponseDto> {
    const category = await this._jobCategoryRepository.findById(id);
    
    if (!category) {
      throw new NotFoundError(ERROR.NOT_FOUND('Category'));
    }

    return JobCategoryMapper.toResponse(category);
  }
}
