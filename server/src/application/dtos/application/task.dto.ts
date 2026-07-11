import { z } from 'zod';
import { IsString, IsOptional, IsUrl } from 'class-validator';

// requests/assign-technical-task.dto.ts
export const AssignTechnicalTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  deadline: z.string().transform((str) => new Date(str)).or(z.date()),
  documentUrl: z.string().optional(),
  documentFilename: z.string().optional(),
});
export type AssignTechnicalTaskRequestDto = z.infer<typeof AssignTechnicalTaskSchema> & {
  applicationId: string;
  performedBy: string;
};

// requests/delete-technical-task.dto.ts
export const DeleteTechnicalTaskRequestDtoSchema = z.object({
  taskId: z.string().uuid('Task ID must be a valid UUID'),
  performedBy: z.string().uuid('Performed by must be a valid UUID'),
  performedByName: z.string().min(1, 'Performed by name is required'),
});
export type DeleteTechnicalTaskRequestDto = z.infer<typeof DeleteTechnicalTaskRequestDtoSchema>;

// requests/submit-technical-task.dto.ts
export class SubmitTechnicalTaskDto {
  @IsString()
  @IsOptional()
    submissionUrl?: string;

  @IsString()
  @IsOptional()
    submissionFilename?: string;

  @IsString()
  @IsUrl()
  @IsOptional()
    submissionLink?: string;

  @IsString()
  @IsOptional()
    submissionNote?: string;
}

// requests/update-technical-task.dto.ts
export const UpdateTechnicalTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  deadline: z.string().transform((str) => new Date(str)).or(z.date()).optional(),
  documentUrl: z.string().optional(),
  documentFilename: z.string().optional(),
  submissionUrl: z.string().optional(),
  submissionFilename: z.string().optional(),
  status: z.enum(['assigned', 'submitted', 'under_review', 'completed', 'cancelled']).optional(),
  rating: z.number().min(1).max(5).optional(),
  feedback: z.string().optional(),
});
export type UpdateTechnicalTaskRequestDto = z.infer<typeof UpdateTechnicalTaskSchema> & {
  taskId: string;
  performedBy: string;
};

// responses/ats-technical-task-response.dto.ts
export interface ATSTechnicalTaskResponseDto {
  id: string;
  applicationId: string;
  title: string;
  description: string;
  deadline: Date;
  documentUrl?: string;
  documentFilename?: string;
  submissionUrl?: string;
  submissionFilename?: string;
  submissionLink?: string;
  submissionNote?: string;
  submittedAt?: Date;
  status: string;
  feedback?: string;
  score?: number;
  createdAt: Date;
  updatedAt: Date;
}
