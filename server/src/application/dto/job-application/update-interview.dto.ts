import { z } from 'zod';

export const UpdateInterviewDto = z.object({
  interview_id: z.string().min(1, 'Interview ID is required'),
  date: z
    .string()
    .or(z.date())
    .transform((val) => {
      if (typeof val === 'string') {
        return new Date(val);
      }
      return val;
    })
    .optional(),
  time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\s?(AM|PM|am|pm)$/, {
      message: 'Time must be in format HH:MM AM/PM (e.g., "10:00 AM")',
    })
    .optional(),
  interview_type: z.string().min(1, 'Interview type is required').max(100, 'Interview type must not exceed 100 characters').optional(),
  location: z.string().min(1, 'Location is required').max(200, 'Location must not exceed 200 characters').optional(),
  interviewer_name: z.string().max(100, 'Interviewer name must not exceed 100 characters').optional(),
  status: z.enum(['scheduled', 'completed', 'cancelled', 'rescheduled']).optional(),
});

export type UpdateInterviewRequestDto = z.infer<typeof UpdateInterviewDto>;

