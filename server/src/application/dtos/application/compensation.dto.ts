import { z } from 'zod';
import { IsString } from 'class-validator';

// requests/add-compensation-note.dto.ts
export class AddCompensationNoteDto {
  @IsString()
    note!: string;
}

// requests/initiate-compensation.dto.ts
export const InitiateCompensationSchema = z.object({
  candidateExpected: z.string().min(1, 'Candidate expected compensation is required'),
  notes: z.string().optional(),
});
export type InitiateCompensationRequestDto = z.infer<typeof InitiateCompensationSchema> & {
  applicationId: string;
  performedBy: string;
};

// requests/schedule-compensation-meeting.dto.ts
export const ScheduleCompensationMeetingSchema = z.object({
  type: z.enum(['call', 'online', 'in-person']),
  date: z.string(),
  time: z.string(),
  videoType: z.enum(['in-app', 'external']).optional(),
  webrtcRoomId: z.string().optional(),
  location: z.string().optional(),
  meetingLink: z.string().url().optional(),
  notes: z.string().optional(),
});
export type ScheduleCompensationMeetingRequestDto = z.infer<typeof ScheduleCompensationMeetingSchema> & {
  applicationId: string;
  performedBy: string;
};

// requests/update-compensation-meeting-status.dto.ts
export const UpdateCompensationMeetingStatusSchema = z.object({
  status: z.enum(['scheduled', 'completed', 'cancelled']),
});
export type UpdateCompensationMeetingStatusRequestDto = z.infer<typeof UpdateCompensationMeetingStatusSchema> & {
  applicationId: string;
  meetingId: string;
  performedBy: string;
};

// requests/update-compensation.dto.ts
export const UpdateCompensationSchema = z.object({
  candidateExpected: z.string().optional(),
  companyProposed: z.string().optional(),
  expectedJoining: z.string().transform((str) => new Date(str)).or(z.date()).optional(),
  benefits: z.array(z.string()).optional(),
  finalAgreed: z.string().optional(),
  approvedAt: z.string().transform((str) => new Date(str)).or(z.date()).optional(),
  approvedBy: z.string().optional(),
  approvedByName: z.string().optional(),
  notes: z.string().optional(),
});
export type UpdateCompensationRequestDto = z.infer<typeof UpdateCompensationSchema> & {
  applicationId: string;
  performedBy: string;
};

// responses/ats-compensation-meeting-response.dto.ts
export interface ATSCompensationMeetingResponseDto {
  id: string;
  applicationId: string;
  scheduledDate: Date;
  type: string;
  videoType?: string;
  webrtcRoomId?: string;
  meetingLink?: string;
  location?: string;
  status: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// responses/ats-compensation.response.dto.ts
export class ATSCompensationResponseDto {
  constructor(
    public readonly id: string,
    public readonly applicationId: string,
    public readonly candidateExpected: string,
    public readonly benefits: string[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly companyProposed?: string,
    public readonly finalAgreed?: string,
    public readonly expectedJoining?: Date,
    public readonly approvedAt?: Date,
    public readonly approvedBy?: string,
    public readonly approvedByName?: string,
  ) { }
}
