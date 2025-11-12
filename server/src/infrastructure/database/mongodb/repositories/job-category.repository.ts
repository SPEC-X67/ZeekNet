import { IJobCategoryRepository, JobCategoryQueryFilters, PaginatedJobCategories } from '../../../../domain/interfaces/repositories/IJobCategoryRepository';
import { JobCategory } from '../../../../domain/entities/job-category.entity';
import { JobCategoryModel, JobCategoryDocument as ModelDocument } from '../models/job-category.model';
import { JobCategoryMapper, JobCategoryDocument } from '../mappers/job-category.mapper';
import { RepositoryBase } from './base-repository';

export class JobCategoryRepository extends RepositoryBase<JobCategory, JobCategoryDocument> implements IJobCategoryRepository {
  constructor() {
    super(JobCategoryModel);
  }

  protected mapToEntity(doc: ModelDocument): JobCategory {
    return JobCategoryMapper.toEntity(doc as unknown as JobCategoryDocument);
  }

  async findByName(name: string): Promise<JobCategory | null> {
    const escapedName = name.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const doc = await this.model.findOne({ 
      name: { $regex: new RegExp(`^${escapedName}$`, 'i') }, 
    }).exec();
    return doc ? this.mapToEntity(doc) : null;
  }

  async findAllWithPagination(filters?: JobCategoryQueryFilters): Promise<PaginatedJobCategories> {
    return await this.paginate<PaginatedJobCategories>({
      page: filters?.page,
      limit: filters?.limit,
      search: filters?.search,
      searchField: 'name',
      sortBy: filters?.sortBy || 'name',
      sortOrder: filters?.sortOrder || 'asc',
      resultKey: 'categories',
    });
  }
}