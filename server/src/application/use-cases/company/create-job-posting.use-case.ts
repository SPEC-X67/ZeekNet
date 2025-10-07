import { IJobPostingRepository } from '../../../domain/interfaces/repositories';
import { ICreateJobPostingUseCase, CreateJobPostingData } from '../../../domain/interfaces/use-cases';
import { AppError } from '../../../domain/errors/errors';
import { JobPosting } from '../../../domain/entities/job-posting.entity';

export class CreateJobPostingUseCase implements ICreateJobPostingUseCase {
  constructor(
    private readonly _jobPostingRepository: IJobPostingRepository,
  ) {}

  async execute(companyId: string, jobData: CreateJobPostingData): Promise<JobPosting> {
    try {
      const jobPosting: Omit<JobPosting, '_id' | 'createdAt' | 'updatedAt' | 'view_count' | 'application_count'> = {
        company_id: companyId,
        title: jobData.title,
        description: jobData.description,
        responsibilities: jobData.responsibilities,
        qualifications: jobData.qualifications,
        nice_to_haves: jobData.nice_to_haves,
        benefits: jobData.benefits,
        salary: jobData.salary,
        employment_types: jobData.employment_types,
        location: jobData.location,
        skills_required: jobData.skills_required,
        category_ids: jobData.category_ids,
        is_active: true,
      };
      
      return await this._jobPostingRepository.create(jobPosting);
    } catch (error) {
      console.error('CreateJobPostingUseCase error:', error);
      if (error instanceof Error) {
        throw new AppError(`Failed to create job posting: ${error.message}`, 500);
      }
      throw new AppError('Failed to create job posting', 500);
    }
  }
}