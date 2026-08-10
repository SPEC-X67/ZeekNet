import { z } from 'zod';
import { CompensationMeetingType } from 'src/domain/enums/compensation-meeting-type.enum';
import { MeetingVideoType } from 'src/domain/enums/meeting-video-type.enum';
import { MeetingStatus } from 'src/domain/enums/meeting-status.enum';

export const ScheduleCompensationMeetingSchema = z.object({
  type: z.nativeEnum(CompensationMeetingType),
  date: z.string(),
  time: z.string(),
  videoType: z.nativeEnum(MeetingVideoType).optional(),
  webrtcRoomId: z.string().optional(),
  location: z.string().optional(),
  meetingLink: z.string().url().optional(),
  notes: z.string().optional(),
});

export const UpdateCompensationMeetingStatusSchema = z.object({
  status: z.nativeEnum(MeetingStatus),
});
