import { CreateSkillRequestSchema, CreateSkillSchema, GetAllSkillsQuerySchema, GetAllSkillsSchema, UpdateSkillRequestSchema, UpdateSkillSchema } from 'src/application/validations/skill.validation';
import { z } from 'zod';

export interface SkillDto {
  id: string;
  name: string;
}
export type CreateSkillRequestDto = z.infer<typeof CreateSkillRequestSchema>;
export type GetAllSkillsQueryDto = z.infer<typeof GetAllSkillsQuerySchema>;
export type GetAllSkillsRequestDto = GetAllSkillsQueryDto;
export type UpdateSkillRequestDto = z.infer<typeof UpdateSkillRequestSchema>;
export interface SkillResponseDto {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface PaginatedSkillsResultDto {
  skills: SkillDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
