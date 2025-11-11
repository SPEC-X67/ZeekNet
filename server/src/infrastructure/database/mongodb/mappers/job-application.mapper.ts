import type { JobApplication } from '../../../../domain/entities/job-application.entity';
import type { JobApplicationDocument } from '../models/job-application.model';

export class JobApplicationMapper {
  static toDomain(doc: JobApplicationDocument): JobApplication {
    return {
      id: doc._id.toString(),
      seeker_id: doc.seeker_id.toString(),
      job_id: doc.job_id.toString(),
      company_id: doc.company_id.toString(),
      cover_letter: doc.cover_letter,
      resume_url: doc.resume_url,
      resume_filename: doc.resume_filename,
      stage: doc.stage,
      score: doc.score,
      interviews: (doc.interviews || []).map(i => ({
        id: i._id?.toString(),
        date: new Date(i.date),
        time: i.time,
        interview_type: i.interview_type,
        location: i.location,
        interviewer_name: i.interviewer_name,
        status: i.status,
        feedback: i.feedback
          ? {
              reviewer_name: i.feedback.reviewer_name,
              rating: i.feedback.rating,
              comment: i.feedback.comment,
              reviewed_at: new Date(i.feedback.reviewed_at),
            }
          : undefined,
        created_at: i.created_at ? new Date(i.created_at) : undefined,
        updated_at: i.updated_at ? new Date(i.updated_at) : undefined,
      })),
      rejection_reason: doc.rejection_reason,
      applied_date: new Date(doc.applied_date),
      createdAt: new Date(doc.createdAt),
      updatedAt: new Date(doc.updatedAt),
    };
  }
}


