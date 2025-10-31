import { JobCategory } from '../../entities/job-category.entity';

export interface IJobCategoryRepository {
  findById(id: string): Promise<JobCategory | null>;
  findAll(): Promise<JobCategory[]>;
  findByName(name: string): Promise<JobCategory | null>;
  create(data: { name: string }): Promise<JobCategory>;
  update(id: string, updates: { name: string }): Promise<JobCategory | null>;
  delete(id: string): Promise<boolean>;
  count(): Promise<number>;
}