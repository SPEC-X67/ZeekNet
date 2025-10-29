import { IJobPostingAnalyticsRepository } from '../../../domain/interfaces/repositories/job/IJobPostingRepository';

export class IncrementJobViewCountUseCase {
  constructor(private readonly _jobPostingRepository: IJobPostingAnalyticsRepository) {}

  async execute(id: string, userRole?: string): Promise<void> {
    try {
      if (userRole === 'seeker') {
        await this._jobPostingRepository.incrementViewCount(id);
      }
    } catch (error) {
      console.error('Failed to increment view count:', error);
    }
  }
}
