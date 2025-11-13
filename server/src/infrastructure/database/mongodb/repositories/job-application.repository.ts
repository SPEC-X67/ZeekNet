import { Types } from 'mongoose';
import type { IJobApplicationRepository, ApplicationFilters, PaginatedApplications } from '../../../../domain/interfaces/repositories/job-application/IJobApplicationRepository';
import type { JobApplication, InterviewSchedule, ApplicationStage } from '../../../../domain/entities/job-application.entity';
import { JobApplicationModel } from '../models/job-application.model';
import { JobApplicationMapper } from '../mappers/job-application.mapper';
import { ValidationError } from 'src/domain/errors/errors';

export class JobApplicationRepository implements IJobApplicationRepository {
  private toObjectId(id: string) {
    return new Types.ObjectId(id);
  }

  async create(data: {
    seeker_id: string;
    job_id: string;
    company_id: string;
    cover_letter: string;
    resume_url: string;
    resume_filename: string;
  }): Promise<JobApplication> {

    const created = await JobApplicationModel.create({
      ...data,
      seeker_id: this.toObjectId(data.seeker_id),
      job_id: this.toObjectId(data.job_id),
      company_id: this.toObjectId(data.company_id),
    });
    return JobApplicationMapper.toDomain(created);
  }

  async findById(id: string): Promise<JobApplication | null> {
    const doc = await JobApplicationModel.findById(id);
    return doc ? JobApplicationMapper.toDomain(doc) : null;
  }

  private async paginate(query: Record<string, unknown>, page = 1, limit = 10): Promise<PaginatedApplications> {
    const skip = (page - 1) * limit;
    const [total, docs] = await Promise.all([
      JobApplicationModel.countDocuments(query),
      JobApplicationModel.find(query).sort({ applied_date: -1 }).skip(skip).limit(limit),
    ]);

    return {
      applications: docs.map(JobApplicationMapper.toDomain),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByJobId(jobId: string, filters: Omit<ApplicationFilters, 'job_id' | 'company_id' | 'seeker_id'>): Promise<PaginatedApplications> {
    const query: Record<string, unknown> = { job_id: this.toObjectId(jobId) };
    if (filters.stage) query.stage = filters.stage;
    return this.paginate(query, filters.page, filters.limit);
  }

  async findBySeekerId(seekerId: string, filters: Omit<ApplicationFilters, 'seeker_id' | 'company_id' | 'job_id'>): Promise<PaginatedApplications> {
    const query: Record<string, unknown> = { seeker_id: this.toObjectId(seekerId) };
    if (filters.stage) query.stage = filters.stage;
    return this.paginate(query, filters.page, filters.limit);
  }

  async findByCompanyId(companyId: string, filters: Omit<ApplicationFilters, 'company_id' | 'seeker_id'>): Promise<PaginatedApplications> {
    const query: Record<string, unknown> = { company_id: this.toObjectId(companyId) };
    if (filters.stage) query.stage = filters.stage;
    if (filters.job_id) query.job_id = this.toObjectId(filters.job_id);
    return this.paginate(query, filters.page, filters.limit);
  }

  async update(id: string, data: Partial<Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>>): Promise<JobApplication | null> {
    const patch: Record<string, unknown> = { ...data };
    if (data.seeker_id) patch.seeker_id = this.toObjectId(data.seeker_id);
    if (data.job_id) patch.job_id = this.toObjectId(data.job_id);
    if (data.company_id) patch.company_id = this.toObjectId(data.company_id);
    
    const updated = await JobApplicationModel.findByIdAndUpdate(id, patch, { new: true });
    return updated ? JobApplicationMapper.toDomain(updated) : null;
  }

  async updateStage(id: string, stage: ApplicationStage, rejectionReason?: string): Promise<JobApplication | null> {
    const updated = await JobApplicationModel.findByIdAndUpdate(
      id,
      { stage, rejection_reason: rejectionReason },
      { new: true },
    );
    return updated ? JobApplicationMapper.toDomain(updated) : null;
  }

  async updateScore(id: string, score: number): Promise<JobApplication | null> {
    const updated = await JobApplicationModel.findByIdAndUpdate(id, { score }, { new: true });
    return updated ? JobApplicationMapper.toDomain(updated) : null;
  }

  async addInterview(applicationId: string, interview: Omit<InterviewSchedule, 'id' | 'created_at' | 'updated_at'>): Promise<JobApplication | null> {
    const now = new Date();
    const updated = await JobApplicationModel.findByIdAndUpdate(
      applicationId,
      {
        $push: {
          interviews: {
            ...interview,
            status: interview.status ?? 'scheduled',
            created_at: now,
            updated_at: now,
          },
        },
      },
      { new: true },
    );
    return updated ? JobApplicationMapper.toDomain(updated) : null;
  }

  async updateInterview(applicationId: string, interviewId: string, interview: Partial<Omit<InterviewSchedule, 'id' | 'created_at' | 'updated_at'>>): Promise<JobApplication | null> {
    const setPayload = Object.entries(interview).reduce((acc, [key, value]) => {
      acc[`interviews.$[i].${key}`] = value;
      return acc;
    }, { 'interviews.$[i].updated_at': new Date() } as Record<string, unknown>);

    const updated = await JobApplicationModel.findOneAndUpdate(
      { _id: this.toObjectId(applicationId) },
      { $set: setPayload },
      { new: true, arrayFilters: [{ 'i._id': this.toObjectId(interviewId) }] },
    );
    return updated ? JobApplicationMapper.toDomain(updated) : null;
  }

  async deleteInterview(applicationId: string, interviewId: string): Promise<JobApplication | null> {
    const updated = await JobApplicationModel.findByIdAndUpdate(
      applicationId,
      { $pull: { interviews: { _id: this.toObjectId(interviewId) } } },
      { new: true },
    );
    return updated ? JobApplicationMapper.toDomain(updated) : null;
  }

  async addInterviewFeedback(applicationId: string, interviewId: string, feedback: { reviewer_name: string; rating?: number; comment: string; reviewed_at: Date }): Promise<JobApplication | null> {
    const updated = await JobApplicationModel.findOneAndUpdate(
      { _id: this.toObjectId(applicationId), 'interviews._id': this.toObjectId(interviewId) },
      {
        $set: {
          'interviews.$.feedback': feedback,
          'interviews.$.updated_at': new Date(),
        },
      },
      { new: true },
    );
    return updated ? JobApplicationMapper.toDomain(updated) : null;
  }

  async checkDuplicateApplication(seekerId: string, jobId: string): Promise<boolean> {
    const existing = await JobApplicationModel.exists({
      seeker_id: this.toObjectId(seekerId),
      job_id: this.toObjectId(jobId),
    });
    return !!existing;
  }
}