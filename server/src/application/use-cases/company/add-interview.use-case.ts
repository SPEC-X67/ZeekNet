import { IJobApplicationRepository } from '../../../domain/interfaces/repositories/job-application/IJobApplicationRepository';
import { IJobPostingRepository } from '../../../domain/interfaces/repositories/job/IJobPostingRepository';
import { ICompanyProfileRepository } from '../../../domain/interfaces/repositories/company/ICompanyProfileRepository';
import { IAddInterviewUseCase, AddInterviewData } from '../../../domain/interfaces/use-cases/IJobApplicationUseCases';
import { NotFoundError, ValidationError } from '../../../domain/errors/errors';
import { JobApplication } from '../../../domain/entities/job-application.entity';

export class AddInterviewUseCase implements IAddInterviewUseCase {
  constructor(
    private readonly _jobApplicationRepository: IJobApplicationRepository,
    private readonly _jobPostingRepository: IJobPostingRepository,
    private readonly _companyProfileRepository: ICompanyProfileRepository,
  ) {}

  async execute(userId: string, applicationId: string, interviewData: AddInterviewData): Promise<JobApplication> {
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
      throw new ValidationError('You can only manage interviews for your own job postings');
    }

    // Validate interview date is in the future
    const interviewDate = interviewData.date instanceof Date ? interviewData.date : new Date(interviewData.date);
    if (interviewDate < new Date()) {
      throw new ValidationError('Interview date must be in the future');
    }

    // Add interview
    const updatedApplication = await this._jobApplicationRepository.addInterview(applicationId, {
      date: interviewDate,
      time: interviewData.time,
      interview_type: interviewData.interview_type,
      location: interviewData.location,
      interviewer_name: interviewData.interviewer_name,
      status: 'scheduled',
    });

    if (!updatedApplication) {
      throw new NotFoundError('Failed to add interview');
    }

    return updatedApplication;
  }
}

