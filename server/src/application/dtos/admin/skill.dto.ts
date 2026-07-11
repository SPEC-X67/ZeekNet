import { z } from 'zod';

// Common Entity DTO
export interface SkillDto {
  id: string;
  name: string;
}

// Create requests DTO
export const CreateSkillRequestDtoSchema = z.object({
  name: z.string().min(1, 'Skill name is required').max(100, 'Skill name must be less than 100 characters').trim(),
});
export type CreateSkillRequestDto = z.infer<typeof CreateSkillRequestDtoSchema>;
export const CreateSkillDto = CreateSkillRequestDtoSchema;

// Get All query DTO
export const GetAllSkillsQueryDtoSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  search: z.string().optional(),
  sortBy: z.string().optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});
export type GetAllSkillsQueryDto = z.infer<typeof GetAllSkillsQueryDtoSchema>;
export const GetAllSkillsDto = GetAllSkillsQueryDtoSchema;
export type GetAllSkillsRequestDto = GetAllSkillsQueryDto;

// Update request DTO
export const UpdateSkillRequestDtoSchema = z.object({
  name: z.string().min(1, 'Skill name is required').max(100, 'Skill name must be less than 100 characters').trim(),
});
export type UpdateSkillRequestDto = z.infer<typeof UpdateSkillRequestDtoSchema>;
export const UpdateSkillDto = UpdateSkillRequestDtoSchema;

// Responses DTO
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
