import { IJobCategoryRepository } from '../../../../domain/interfaces/repositories/IJobCategoryRepository';
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
    // Case-insensitive search - escape special regex characters
    const escapedName = name.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const doc = await this.model.findOne({ 
      name: { $regex: new RegExp(`^${escapedName}$`, 'i') } 
    }).exec();
    return doc ? this.mapToEntity(doc) : null;
  }
}