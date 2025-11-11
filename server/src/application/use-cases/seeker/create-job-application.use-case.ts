import { IJobApplicationRepository } from '../../../domain/interfaces/repositories/job-application/IJobApplicationRepository';
import { IJobPostingRepository } from '../../../domain/interfaces/repositories/job/IJobPostingRepository';
import { IUserRepository } from '../../../domain/interfaces/repositories/user/IUserRepository';
import { ICreateJobApplicationUseCase, CreateJobApplicationData } from '../../../domain/interfaces/use-cases/IJobApplicationUseCases';
import { ValidationError, NotFoundError } from '../../../domain/errors/errors';
import { JobApplication } from '../../../domain/entities/job-application.entity';

export class CreateJobApplicationUseCase implements ICreateJobApplicationUseCase {
  constructor(
    private readonly _jobApplicationRepository: IJobApplicationRepository,
    private readonly _jobPostingRepository: IJobPostingRepository,
    private readonly _userRepository: IUserRepository,
  ) {}

  async execute(seekerId: string, data: CreateJobApplicationData): Promise<JobApplication> {
    // Check if user is verified
    const user = await this._userRepository.findById(seekerId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    if (!user.isVerified) {
      throw new ValidationError('Please verify your email before applying for jobs');
    }

    // Check if job exists and is active
    const job = await this._jobPostingRepository.findById(data.job_id);
    if (!job) {
      throw new NotFoundError('Job posting not found');
    }
    if (!job.is_active) {
      throw new ValidationError('This job posting is no longer active');
    }
    if (job.admin_blocked) {
      throw new ValidationError('This job posting has been blocked');
    }

    // Check for duplicate application
    const existingApplication = await this._jobApplicationRepository.checkDuplicateApplication(seekerId, data.job_id);
    if (existingApplication) {
      throw new ValidationError('You have already applied for this job');
    }

    // Create application
    const application = await this._jobApplicationRepository.create({
      seeker_id: seekerId,
      job_id: data.job_id,
      company_id: job.company_id,
      cover_letter: data.cover_letter,
      resume_url: data.resume_url,
      resume_filename: data.resume_filename,
    });

    await this._jobPostingRepository.incrementApplicationCount(data.job_id);

    return application;
  }
}

