import { IJobApplicationRepository } from '../../../domain/interfaces/repositories/job-application/IJobApplicationRepository';
import { IJobPostingRepository } from '../../../domain/interfaces/repositories/job/IJobPostingRepository';
import { ICompanyProfileRepository } from '../../../domain/interfaces/repositories/company/ICompanyProfileRepository';
import { IUpdateApplicationStageUseCase } from '../../../domain/interfaces/use-cases/IJobApplicationUseCases';
import { NotFoundError, ValidationError } from '../../../domain/errors/errors';
import { JobApplication } from '../../../domain/entities/job-application.entity';

export class UpdateApplicationStageUseCase implements IUpdateApplicationStageUseCase {
  constructor(
    private readonly _jobApplicationRepository: IJobApplicationRepository,
    private readonly _jobPostingRepository: IJobPostingRepository,
    private readonly _companyProfileRepository: ICompanyProfileRepository,
  ) {}

  async execute(
    userId: string,
    applicationId: string,
    stage: 'applied' | 'shortlisted' | 'interview' | 'rejected' | 'hired',
    rejectionReason?: string,
  ): Promise<JobApplication> {
    // Get company profile
    const companyProfile = await this._companyProfileRepository.getProfileByUserId(userId);
    if (!companyProfile) {
      throw new NotFoundError('Company profile not found');
    }

    // Get application
    const application = await this._jobApplicationRepository.findById(applicationId);
    if (!application) {
      throw new NotFoundError('Application not found');
    }

    // Verify company owns the job
    const job = await this._jobPostingRepository.findById(application.job_id);
    if (!job) {
      throw new NotFoundError('Job posting not found');
    }
    if (job.company_id !== companyProfile.id) {
      throw new ValidationError('You can only update applications for your own job postings');
    }

    // Update stage
    const updatedApplication = await this._jobApplicationRepository.updateStage(applicationId, stage, rejectionReason);

    if (!updatedApplication) {
      throw new NotFoundError('Failed to update application stage');
    }

    return updatedApplication;
  }
}

