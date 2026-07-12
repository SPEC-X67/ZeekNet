import { z } from 'zod';

export const ScheduleInterviewSchema = z.object({
  applicationId: z.string().min(1, 'Application ID is required'),
  title: z.string().min(1, 'Title is required'),
  scheduledDate: z.coerce.date(),
  type: z.enum(['online', 'offline']),
  videoType: z.enum(['in-app', 'external']).optional(),
  webrtcRoomId: z.string().optional(),
  meetingLink: z.string().url().optional(),
  location: z.string().optional(),
});

export const UpdateInterviewSchema = z.object({
  interviewId: z.string().uuid('Interview ID must be a valid UUID'),
  status: z.enum(['scheduled', 'completed', 'cancelled']).optional(),
  rating: z.number().min(0).max(10).optional(),
  feedback: z.string().optional(),
  userId: z.string().uuid('User ID must be a valid UUID'),
});

export const DeleteInterviewSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  applicationId: z.string().min(1, 'Application ID is required'),
  interviewId: z.string().min(1, 'Interview ID is required'),
});
