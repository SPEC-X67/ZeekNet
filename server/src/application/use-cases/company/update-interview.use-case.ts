import { IJobApplicationRepository } from '../../../domain/interfaces/repositories/job-application/IJobApplicationRepository';
import { IJobPostingRepository } from '../../../domain/interfaces/repositories/job/IJobPostingRepository';
import { ICompanyProfileRepository } from '../../../domain/interfaces/repositories/company/ICompanyProfileRepository';
import { IUpdateInterviewUseCase, UpdateInterviewData } from '../../../domain/interfaces/use-cases/IJobApplicationUseCases';
import { NotFoundError, ValidationError } from '../../../domain/errors/errors';
import { JobApplication } from '../../../domain/entities/job-application.entity';

export class UpdateInterviewUseCase implements IUpdateInterviewUseCase {
  constructor(
    private readonly _jobApplicationRepository: IJobApplicationRepository,
    private readonly _jobPostingRepository: IJobPostingRepository,
    private readonly _companyProfileRepository: ICompanyProfileRepository,
  ) {}

  async execute(userId: string, applicationId: string, interviewId: string, interviewData: UpdateInterviewData): Promise<JobApplication> {
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

    // Check if interview exists
    const interview = application.interviews.find((int) => int.id === interviewId);
    if (!interview) {
      throw new NotFoundError('Interview not found');
    }

    // Prepare update data
    const updateData: Partial<UpdateInterviewData> = {};
    if (interviewData.date !== undefined) {
      updateData.date = interviewData.date instanceof Date ? interviewData.date : new Date(interviewData.date);
    }
    if (interviewData.time !== undefined) {
      updateData.time = interviewData.time;
    }
    if (interviewData.interview_type !== undefined) {
      updateData.interview_type = interviewData.interview_type;
    }
    if (interviewData.location !== undefined) {
      updateData.location = interviewData.location;
    }
    if (interviewData.interviewer_name !== undefined) {
      updateData.interviewer_name = interviewData.interviewer_name;
    }
    if (interviewData.status !== undefined) {
      updateData.status = interviewData.status;
    }

    // Update interview
    const updatedApplication = await this._jobApplicationRepository.updateInterview(applicationId, interviewId, updateData);

    if (!updatedApplication) {
      throw new NotFoundError('Failed to update interview');
    }

    return updatedApplication;
  }
}

