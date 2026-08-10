import { z } from 'zod';

export const AssignTechnicalTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  deadline: z.coerce.date(),
  documentUrl: z.string().optional(),
  documentFilename: z.string().optional(),
});

export const DeleteTechnicalTaskRequestSchema = z.object({
  taskId: z.string().uuid('Task ID must be a valid UUID'),
  performedBy: z.string().uuid('Performed by must be a valid UUID'),
  performedByName: z.string().min(1, 'Performed by name is required'),
});

export const SubmitTechnicalTaskSchema = z.object({
  submissionUrl: z.string().optional(),
  submissionFilename: z.string().optional(),
  submissionLink: z.string().url('Invalid submission link URL').optional().or(z.literal('')),
  submissionNote: z.string().optional(),
});

export const UpdateTechnicalTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  deadline: z.coerce.date().optional(),
  documentUrl: z.string().optional(),
  documentFilename: z.string().optional(),
  submissionUrl: z.string().optional(),
  submissionFilename: z.string().optional(),
  status: z.enum(['assigned', 'submitted', 'under_review', 'completed', 'cancelled']).optional(),
  rating: z.number().min(1).max(5).optional(),
  feedback: z.string().optional(),
});
