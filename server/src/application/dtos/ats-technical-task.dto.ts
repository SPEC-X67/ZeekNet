import { AssignTechnicalTaskSchema, DeleteTechnicalTaskRequestSchema, SubmitTechnicalTaskSchema, UpdateTechnicalTaskSchema } from 'src/application/validations/ats-technical-task.validation';
import { z } from 'zod';

export type AssignTechnicalTaskRequestDto = z.infer<typeof AssignTechnicalTaskSchema> & {
  applicationId: string;
  performedBy: string;
};
export type DeleteTechnicalTaskRequestDto = z.infer<typeof DeleteTechnicalTaskRequestSchema>;
export type SubmitTechnicalTaskDto = z.infer<typeof SubmitTechnicalTaskSchema>;
export type UpdateTechnicalTaskRequestDto = z.infer<typeof UpdateTechnicalTaskSchema> & {
  taskId: string;
  performedBy: string;
};
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
