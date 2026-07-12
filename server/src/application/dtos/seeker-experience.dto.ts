import { AddExperienceRequestSchema, UpdateExperienceRequestSchema } from 'src/application/validations/seeker-experience.validation';
import { z } from 'zod';

export type AddExperienceRequestDto = z.infer<typeof AddExperienceRequestSchema>;
export type UpdateExperienceRequestDto = z.infer<typeof UpdateExperienceRequestSchema>;
export interface ExperienceResponseDto {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  employmentType: string;
  location?: string;
  description?: string;
  technologies: string[];
  isCurrent: boolean;
}
