import { IJobPostingSearchRepository } from '../../../domain/interfaces/repositories/job/IJobPostingRepository';
import { AppError } from '../../../domain/errors/errors';

export class AdminGetJobStatsUseCase {
  constructor(private readonly _jobPostingRepository: IJobPostingSearchRepository) {}

  async execute() {
    try {
      const allJobs = await this._jobPostingRepository.findAll({
        page: 1,
        limit: 10000,
      });

      const jobs = allJobs.jobs;

      const stats = {
        total: jobs.length,
        active: jobs.filter((job) => job.is_active).length,
        inactive: jobs.filter((job) => !job.is_active).length,
        totalApplications: jobs.reduce((sum, job) => sum + job.application_count, 0),
        totalViews: jobs.reduce((sum, job) => sum + job.view_count, 0),
      };

      return stats;
    } catch (error) {
      throw new AppError('Failed to fetch job statistics', 500);
    }
  }
}