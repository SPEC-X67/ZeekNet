import { z } from 'zod';

// requests/add-interview-feedback.dto.ts
export const AddInterviewFeedbackParamsDto = z.object({
  applicationId: z.string().min(1, 'Application ID is required'),
  interviewId: z.string().min(1, 'Interview ID is required'),
});
export const AddInterviewFeedbackDto = z.object({
  interview_id: z.string().min(1, 'Interview ID is required').optional(),
  reviewer_name: z.string().min(1, 'Reviewer name is required'),
  rating: z.number().min(1).max(5).optional(),
  comment: z.string().min(1, 'Comment is required'),
});
export type AddInterviewFeedbackParamsRequestDto = z.infer<typeof AddInterviewFeedbackParamsDto>;
export type AddInterviewFeedbackRequestDto = z.infer<typeof AddInterviewFeedbackDto>;

// requests/add-interview.dto.ts
export const AddInterviewDto = z.object({
  interview_date: z.string().min(1, 'Interview date is required'),
  interview_time: z.string().min(1, 'Interview time is required'),
  interview_type: z.enum(['phone', 'video', 'in-person', 'other']),
  location: z.string().optional(),
  notes: z.string().optional(),
});
export type AddInterviewRequestDto = z.infer<typeof AddInterviewDto>;

// requests/schedule-interview.dto.ts
export const ScheduleInterviewRequestDtoSchema = z.object({
  applicationId: z.string().min(1, 'Application ID is required'),
  title: z.string().min(1, 'Title is required'),
  scheduledDate: z.union([z.string().datetime(), z.date()]),
  type: z.enum(['online', 'offline']),
  videoType: z.enum(['in-app', 'external']).optional(),
  webrtcRoomId: z.string().optional(),
  meetingLink: z.string().url().optional(),
  location: z.string().optional(),
});
export type ScheduleInterviewRequestDto = z.infer<typeof ScheduleInterviewRequestDtoSchema> & {
  userId: string;
};
export const ScheduleInterviewDtoSchema = ScheduleInterviewRequestDtoSchema;
export type ScheduleInterviewDto = ScheduleInterviewRequestDto;

// requests/update-interview.dto.ts
export const UpdateInterviewRequestDtoSchema = z.object({
  interviewId: z.string().uuid('Interview ID must be a valid UUID'),
  status: z.enum(['scheduled', 'completed', 'cancelled']).optional(),
  rating: z.number().min(0).max(10).optional(),
  feedback: z.string().optional(),
  userId: z.string().uuid('User ID must be a valid UUID'),
});
export type UpdateInterviewRequestDto = z.infer<typeof UpdateInterviewRequestDtoSchema>;
export const UpdateInterviewDtoSchema = UpdateInterviewRequestDtoSchema;
export type UpdateInterviewDto = UpdateInterviewRequestDto;

// responses/ats-interview-response.dto.ts
export interface ATSInterviewResponseDto {
  id: string;
  applicationId: string;
  title: string;
  scheduledDate: Date;
  type: string;
  videoType?: string;
  webrtcRoomId?: string;
  meetingLink?: string;
  location?: string;
  status: string;
  rating?: number;
  feedback?: string;
  createdAt: Date;
  updatedAt: Date;
}
