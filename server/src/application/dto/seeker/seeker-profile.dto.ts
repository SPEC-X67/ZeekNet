import { z } from 'zod';
import { commonValidations, fieldValidations } from '../../../shared/validation/common';

export const ExperienceDto = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2, 'Title must be at least 2 characters'),
  company: z.string().min(2, 'Company must be at least 2 characters'),
  startDate: z.string().datetime('Invalid start date format'),
  endDate: z.string().datetime('Invalid end date format').optional(),
  employmentType: z.string().min(2, 'Employment type is required'),
  location: z.string().optional(),
  description: z.string().optional(),
  technologies: z.array(z.string()).default([]),
  isCurrent: z.boolean().default(false),
});

export const EducationDto = z.object({
  id: z.string().uuid().optional(),
  school: z.string().min(2, 'School must be at least 2 characters'),
  degree: z.string().optional(),
  fieldOfStudy: z.string().optional(),
  startDate: z.string().datetime('Invalid start date format'),
  endDate: z.string().datetime('Invalid end date format').optional(),
  grade: z.string().optional(),
});

export const ResumeMetaDto = z.object({
  url: z.string().url('Invalid resume URL'),
  fileName: z.string().min(1, 'File name is required'),
  uploadedAt: z.string().datetime('Invalid upload date format'),
});

export const SocialLinkDto = z.object({
  name: z.string().min(1, 'Social link name is required'),
  link: z.string().url('Invalid social link URL'),
});

export const CreateSeekerProfileDto = z.object({
  headline: z.string().optional(),
  summary: z.string().optional(),
  location: z.string().optional(),
  phone: z.string().optional(),
  email: commonValidations.email,
  avatarUrl: commonValidations.optionalUrl,
  skills: z.array(z.string()).default([]),
  socialLinks: z.array(SocialLinkDto).default([]),
});

export const UpdateSeekerProfileDto = CreateSeekerProfileDto.partial();

export const AddExperienceDto = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  company: z.string().min(2, 'Company must be at least 2 characters'),
  startDate: z.string().datetime('Invalid start date format'),
  endDate: z.string().datetime('Invalid end date format').optional(),
  employmentType: z.string().min(2, 'Employment type is required'),
  location: z.string().optional(),
  description: z.string().optional(),
  technologies: z.array(z.string()).default([]),
  isCurrent: z.boolean().default(false),
});

export const UpdateExperienceDto = AddExperienceDto.partial();

export const AddEducationDto = z.object({
  school: z.string().min(2, 'School must be at least 2 characters'),
  degree: z.string().optional(),
  fieldOfStudy: z.string().optional(),
  startDate: z.string().datetime('Invalid start date format'),
  endDate: z.string().datetime('Invalid end date format').optional(),
  grade: z.string().optional(),
});

export const UpdateEducationDto = AddEducationDto.partial();

export const UpdateSkillsDto = z.object({
  skills: z.array(z.string()).min(0, 'Skills must be an array'),
});

export const UploadResumeDto = z.object({
  url: z.string().url('Invalid resume URL'),
  fileName: z.string().min(1, 'File name is required'),
});

// Type exports
export type ExperienceRequestDto = z.infer<typeof ExperienceDto>;
export type EducationRequestDto = z.infer<typeof EducationDto>;
export type ResumeMetaRequestDto = z.infer<typeof ResumeMetaDto>;
export type SocialLinkRequestDto = z.infer<typeof SocialLinkDto>;
export type CreateSeekerProfileRequestDto = z.infer<typeof CreateSeekerProfileDto>;
export type UpdateSeekerProfileRequestDto = z.infer<typeof UpdateSeekerProfileDto>;
export type AddExperienceRequestDto = z.infer<typeof AddExperienceDto>;
export type UpdateExperienceRequestDto = z.infer<typeof UpdateExperienceDto>;
export type AddEducationRequestDto = z.infer<typeof AddEducationDto>;
export type UpdateEducationRequestDto = z.infer<typeof UpdateEducationDto>;
export type UpdateSkillsRequestDto = z.infer<typeof UpdateSkillsDto>;
export type UploadResumeRequestDto = z.infer<typeof UploadResumeDto>;
