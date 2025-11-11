export type ApplicationStage = 'applied' | 'shortlisted' | 'interview' | 'rejected' | 'hired';

export interface InterviewFeedback {
  reviewer_name: string;
  rating?: number;
  comment: string;
  reviewed_at: Date;
}

export interface InterviewSchedule {
  id?: string;
  date: Date;
  time: string;
  interview_type: string;
  location: string;
  interviewer_name?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  feedback?: InterviewFeedback;
  created_at?: Date;
  updated_at?: Date;
}

export interface JobApplication {
  id: string;
  seeker_id: string;
  job_id: string;
  company_id: string;

  cover_letter: string;
  resume_url: string;
  resume_filename: string;

  stage: ApplicationStage;
  score?: number;

  interviews: InterviewSchedule[];

  rejection_reason?: string;

  applied_date: Date;
  createdAt: Date;
  updatedAt: Date;
}


