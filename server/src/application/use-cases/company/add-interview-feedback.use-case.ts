import { IJobApplicationRepository } from '../../../domain/interfaces/repositories/job-application/IJobApplicationRepository';
import { IJobPostingRepository } from '../../../domain/interfaces/repositories/job/IJobPostingRepository';
import { ICompanyProfileRepository } from '../../../domain/interfaces/repositories/company/ICompanyProfileRepository';
import { IAddInterviewFeedbackUseCase, AddInterviewFeedbackData } from '../../../domain/interfaces/use-cases/IJobApplicationUseCases';
import { NotFoundError, ValidationError } from '../../../domain/errors/errors';
import { JobApplication } from '../../../domain/entities/job-application.entity';

export class AddInterviewFeedbackUseCase implements IAddInterviewFeedbackUseCase {
  constructor(
    private readonly _jobApplicationRepository: IJobApplicationRepository,
    private readonly _jobPostingRepository: IJobPostingRepository,
    private readonly _companyProfileRepository: ICompanyProfileRepository,
  ) {}

  async execute(userId: string, applicationId: string, interviewId: string, feedbackData: AddInterviewFeedbackData): Promise<JobApplication> {
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

    // Validate interview is completed before adding feedback
    if (interview.status !== 'completed') {
      throw new ValidationError('Feedback can only be added for completed interviews');
    }

    // Check if feedback already exists
    if (interview.feedback) {
      throw new ValidationError('Feedback already exists for this interview');
    }

    // Add feedback
    const updatedApplication = await this._jobApplicationRepository.addInterviewFeedback(applicationId, interviewId, {
      reviewer_name: feedbackData.reviewer_name,
      rating: feedbackData.rating,
      comment: feedbackData.comment,
      reviewed_at: new Date(),
    });

    if (!updatedApplication) {
      throw new NotFoundError('Failed to add interview feedback');
    }

    return updatedApplication;
  }
}

