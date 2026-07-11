import { IUseCase } from 'src/domain/interfaces/use-cases/base/IUseCase';
import { IJobCategoryRepository } from 'src/domain/interfaces/repositories/job-category/IJobCategoryRepository';
import { GetAllJobCategoriesQueryDto, PaginatedJobCategoriesResultDto } from 'src/application/dtos/admin/job-category.dto';
import { JobCategoryMapper } from 'src/application/mappers/job/job-category.mapper';
import { injectable, inject } from 'inversify';
import { TYPES } from 'src/shared/constants/types';

@injectable()
export class GetAllJobCategoriesUseCase implements IUseCase<GetAllJobCategoriesQueryDto, PaginatedJobCategoriesResultDto> {
  constructor(@inject(TYPES.JobCategoryRepository) private readonly _jobCategoryRepository: IJobCategoryRepository) {}

  async execute(options: GetAllJobCategoriesQueryDto): Promise<PaginatedJobCategoriesResultDto> {
    const query: Record<string, unknown> = {};
    if (options.search) {
      query.name = { $regex: options.search, $options: 'i' };
    }

    const result = await this._jobCategoryRepository.paginate(query, {
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy || 'name',
      sortOrder: options.sortOrder || 'asc',
    });

    return {
      categories: JobCategoryMapper.toResponseList(result.data),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }
}
