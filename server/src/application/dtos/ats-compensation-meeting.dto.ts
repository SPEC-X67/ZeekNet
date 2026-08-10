import { ScheduleCompensationMeetingSchema, UpdateCompensationMeetingStatusSchema } from 'src/application/validations/ats-compensation-meeting.validation';
import { z } from 'zod';

export type ScheduleCompensationMeetingRequestDto = z.infer<typeof ScheduleCompensationMeetingSchema> & {
  applicationId: string;
  performedBy: string;
};
export type UpdateCompensationMeetingStatusRequestDto = z.infer<typeof UpdateCompensationMeetingStatusSchema> & {
  applicationId: string;
  meetingId: string;
  performedBy: string;
};
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
