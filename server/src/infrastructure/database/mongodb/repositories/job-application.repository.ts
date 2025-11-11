import { Types } from 'mongoose';
import type { IJobApplicationRepository, ApplicationFilters, PaginatedApplications } from '../../../../domain/interfaces/repositories/job-application/IJobApplicationRepository';
import type { JobApplication, InterviewSchedule, ApplicationStage } from '../../../../domain/entities/job-application.entity';
import { JobApplicationModel } from '../models/job-application.model';
import { JobApplicationMapper } from '../mappers/job-application.mapper';

export class JobApplicationRepository implements IJobApplicationRepository {
  async create(data: {
    seeker_id: string;
    job_id: string;
    company_id: string;
    cover_letter: string;
    resume_url: string;
    resume_filename: string;
  }): Promise<JobApplication> {
    const created = await JobApplicationModel.create({
      seeker_id: new Types.ObjectId(data.seeker_id),
      job_id: new Types.ObjectId(data.job_id),
      company_id: new Types.ObjectId(data.company_id),
      cover_letter: data.cover_letter,
      resume_url: data.resume_url,
      resume_filename: data.resume_filename,
    });
    return JobApplicationMapper.toDomain(created);
  }

  async findById(id: string): Promise<JobApplication | null> {
    const doc = await JobApplicationModel.findById(id);
    return doc ? JobApplicationMapper.toDomain(doc) : null;
  }

  private _paginateQuery(baseQuery: any, { page = 1, limit = 10 }: Pick<ApplicationFilters, 'page' | 'limit'>): Promise<PaginatedApplications> {
    const skip = Math.max(0, (page - 1) * limit);
    return Promise.all([
      JobApplicationModel.countDocuments(baseQuery),
      JobApplicationModel.find(baseQuery).sort({ applied_date: -1 }).skip(skip).limit(limit),
    ]).then(([total, docs]) => ({
      applications: docs.map(JobApplicationMapper.toDomain),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }));
  }

  async findByJobId(jobId: string, filters: Omit<ApplicationFilters, 'job_id' | 'company_id' | 'seeker_id'>): Promise<PaginatedApplications> {
    const query: any = { job_id: new Types.ObjectId(jobId) };
    if (filters.stage) query.stage = filters.stage;
    if (filters.search) {
      // Placeholder for text search across denormalized fields (if added later)
    }
    return this._paginateQuery(query, { page: filters.page, limit: filters.limit });
  }

  async findBySeekerId(seekerId: string, filters: Omit<ApplicationFilters, 'seeker_id' | 'company_id' | 'job_id'>): Promise<PaginatedApplications> {
    const query: any = { seeker_id: new Types.ObjectId(seekerId) };
    if (filters.stage) query.stage = filters.stage;
    return this._paginateQuery(query, { page: filters.page, limit: filters.limit });
  }

  async findByCompanyId(companyId: string, filters: Omit<ApplicationFilters, 'company_id' | 'seeker_id'>): Promise<PaginatedApplications> {
    const query: any = { company_id: new Types.ObjectId(companyId) };
    if (filters.stage) query.stage = filters.stage;
    if (filters.job_id) query.job_id = new Types.ObjectId(filters.job_id);
    return this._paginateQuery(query, { page: filters.page, limit: filters.limit });
  }

  async update(id: string, data: Partial<Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>>): Promise<JobApplication | null> {
    const patch: any = { ...data };
    if (patch.seeker_id) patch.seeker_id = new Types.ObjectId(patch.seeker_id);
    if (patch.job_id) patch.job_id = new Types.ObjectId(patch.job_id);
    if (patch.company_id) patch.company_id = new Types.ObjectId(patch.company_id);
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
    const updated = await JobApplicationModel.findByIdAndUpdate(
      id,
      { score },
      { new: true },
    );
    return updated ? JobApplicationMapper.toDomain(updated) : null;
  }

  async addInterview(applicationId: string, interview: Omit<InterviewSchedule, 'id' | 'created_at' | 'updated_at'>): Promise<JobApplication | null> {
    const updated = await JobApplicationModel.findByIdAndUpdate(
      applicationId,
      {
        $push: {
          interviews: {
            date: interview.date,
            time: interview.time,
            interview_type: interview.interview_type,
            location: interview.location,
            interviewer_name: interview.interviewer_name,
            status: interview.status ?? 'scheduled',
            created_at: new Date(),
            updated_at: new Date(),
          },
        },
      },
      { new: true },
    );
    return updated ? JobApplicationMapper.toDomain(updated) : null;
  }

  async updateInterview(applicationId: string, interviewId: string, interview: Partial<Omit<InterviewSchedule, 'id' | 'created_at' | 'updated_at'>>): Promise<JobApplication | null> {
    const arrayFilter = { 'i._id': new Types.ObjectId(interviewId) };
    const setPayload: any = {};
    if (interview.date !== undefined) setPayload['interviews.$[i].date'] = interview.date;
    if (interview.time !== undefined) setPayload['interviews.$[i].time'] = interview.time;
    if (interview.interview_type !== undefined) setPayload['interviews.$[i].interview_type'] = interview.interview_type;
    if (interview.location !== undefined) setPayload['interviews.$[i].location'] = interview.location;
    if (interview.interviewer_name !== undefined) setPayload['interviews.$[i].interviewer_name'] = interview.interviewer_name;
    if (interview.status !== undefined) setPayload['interviews.$[i].status'] = interview.status;
    setPayload['interviews.$[i].updated_at'] = new Date();

    const updated = await JobApplicationModel.findOneAndUpdate(
      { _id: new Types.ObjectId(applicationId) },
      { $set: setPayload },
      { new: true, arrayFilters: [arrayFilter] },
    );
    return updated ? JobApplicationMapper.toDomain(updated) : null;
  }

  async deleteInterview(applicationId: string, interviewId: string): Promise<JobApplication | null> {
    const updated = await JobApplicationModel.findByIdAndUpdate(
      applicationId,
      { $pull: { interviews: { _id: new Types.ObjectId(interviewId) } } },
      { new: true },
    );
    return updated ? JobApplicationMapper.toDomain(updated) : null;
  }

  async addInterviewFeedback(applicationId: string, interviewId: string, feedback: { reviewer_name: string; rating?: number; comment: string; reviewed_at: Date }): Promise<JobApplication | null> {
    const updated = await JobApplicationModel.findOneAndUpdate(
      { _id: new Types.ObjectId(applicationId), 'interviews._id': new Types.ObjectId(interviewId) },
      {
        $set: {
          'interviews.$.feedback': {
            reviewer_name: feedback.reviewer_name,
            rating: feedback.rating,
            comment: feedback.comment,
            reviewed_at: feedback.reviewed_at,
          },
          'interviews.$.updated_at': new Date(),
        },
      },
      { new: true },
    );
    return updated ? JobApplicationMapper.toDomain(updated) : null;
  }

  async checkDuplicateApplication(seekerId: string, jobId: string): Promise<boolean> {
    const existing = await JobApplicationModel.findOne({
      seeker_id: new Types.ObjectId(seekerId),
      job_id: new Types.ObjectId(jobId),
    }).select({ _id: 1 });
    return !!existing;
  }
}


