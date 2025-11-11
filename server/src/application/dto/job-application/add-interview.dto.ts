import { z } from 'zod';

export const AddInterviewDto = z.object({
  date: z.string().or(z.date()).transform((val) => {
    if (typeof val === 'string') {
      return new Date(val);
    }
    return val;
  }),
  time: z.string().min(1, 'Time is required').regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\s?(AM|PM|am|pm)$/, {
    message: 'Time must be in format HH:MM AM/PM (e.g., "10:00 AM")',
  }),
  interview_type: z.string().min(1, 'Interview type is required').max(100, 'Interview type must not exceed 100 characters'),
  location: z.string().min(1, 'Location is required').max(200, 'Location must not exceed 200 characters'),
  interviewer_name: z.string().max(100, 'Interviewer name must not exceed 100 characters').optional(),
});

export type AddInterviewRequestDto = z.infer<typeof AddInterviewDto>;

