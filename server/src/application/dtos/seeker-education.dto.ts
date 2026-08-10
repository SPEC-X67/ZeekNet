import { AddEducationRequestSchema, AddEducationSchema, UpdateEducationRequestSchema, UpdateEducationSchema } from 'src/application/validations/seeker-education.validation';
import { z } from 'zod';

export type AddEducationRequestDto = z.infer<typeof AddEducationRequestSchema>;
export type UpdateEducationRequestDto = z.infer<typeof UpdateEducationRequestSchema>;
export interface EducationResponseDto {
  id: string;
  school: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
  grade?: string;
}
