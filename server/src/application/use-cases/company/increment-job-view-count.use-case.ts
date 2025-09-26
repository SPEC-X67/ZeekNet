import { injectable, inject } from 'inversify';
import { JobPostingRepository } from '../../../domain/repositories/job-posting.repository.interface';
import { TYPES } from '../../../infrastructure/di/types';

@injectable()
export class IncrementJobViewCountUseCase {
  constructor(@inject(TYPES.JobPostingRepository) private jobPostingRepository: JobPostingRepository) {}

  async execute(id: string): Promise<void> {
    try {
      await this.jobPostingRepository.incrementViewCount(id);
    } catch (error) {
      console.error('Failed to increment view count:', error);
    }
  }
}
