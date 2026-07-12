import { z } from 'zod';
import {
  ScheduleInterviewSchema,
  UpdateInterviewSchema,
  DeleteInterviewSchema,
} from 'src/application/validations/ats-interview.validation';

export type ScheduleInterviewRequestDto = z.infer<typeof ScheduleInterviewSchema> & {
  userId: string;
};
export type ScheduleInterviewDto = ScheduleInterviewRequestDto;

export type UpdateInterviewRequestDto = z.infer<typeof UpdateInterviewSchema>;
export type UpdateInterviewDto = UpdateInterviewRequestDto;

export type DeleteInterviewDto = z.infer<typeof DeleteInterviewSchema>;

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
