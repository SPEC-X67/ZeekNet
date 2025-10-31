import { z } from 'zod';
import { commonValidations } from '../../../shared/validation/common';

const EmploymentTypeSchema = z.enum(['full-time', 'part-time', 'contract', 'internship', 'remote', 'freelance']);

const SocialLinkSchema = z.object({
  name: z.string().min(1, 'Social link name is required'),
  link: z.string().url('Please enter a valid URL'),
});

// Create Seeker Profile DTO
export const CreateSeekerProfileDto = z.object({
  headline: z.string().max(100, 'Headline must not exceed 100 characters').optional(),
  summary: z.string().max(2000, 'Summary must not exceed 2000 characters').optional(),
  location: z.string().max(100, 'Location must not exceed 100 characters').optional(),
  phone: commonValidations.phoneNumber.optional(),
  email: commonValidations.email.optional(),
  skills: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
  socialLinks: z.array(SocialLinkSchema).default([]),
});

export type CreateSeekerProfileRequestDto = z.infer<typeof CreateSeekerProfileDto>;

// Update Seeker Profile DTO
export const UpdateSeekerProfileDto = z.object({
  headline: z.string().max(100, 'Headline must not exceed 100 characters').optional(),
  summary: z.string().max(2000, 'Summary must not exceed 2000 characters').optional(),
  location: z.string().max(100, 'Location must not exceed 100 characters').optional(),
  phone: commonValidations.phoneNumber.optional(),
  email: commonValidations.email.optional(),
  skills: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  socialLinks: z.array(SocialLinkSchema).optional(),
});

export type UpdateSeekerProfileRequestDto = z.infer<typeof UpdateSeekerProfileDto>;

// Add Experience DTO
export const AddExperienceDto = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must not exceed 100 characters'),
  company: z.string().min(1, 'Company is required').max(100, 'Company must not exceed 100 characters'),
  startDate: z.string().datetime('Please enter a valid start date'),
  endDate: z.string().datetime('Please enter a valid end date').optional(),
  employmentType: EmploymentTypeSchema,
  location: z.string().max(100, 'Location must not exceed 100 characters').optional(),
  description: z.string().max(2000, 'Description must not exceed 2000 characters').optional(),
  technologies: z.array(z.string()).default([]),
  isCurrent: z.boolean().default(false),
});

export type AddExperienceRequestDto = z.infer<typeof AddExperienceDto>;

// Update Experience DTO
export const UpdateExperienceDto = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must not exceed 100 characters').optional(),
  company: z.string().min(1, 'Company is required').max(100, 'Company must not exceed 100 characters').optional(),
  startDate: z.string().datetime('Please enter a valid start date').optional(),
  endDate: z.string().datetime('Please enter a valid end date').optional(),
  employmentType: EmploymentTypeSchema.optional(),
  location: z.string().max(100, 'Location must not exceed 100 characters').optional(),
  description: z.string().max(2000, 'Description must not exceed 2000 characters').optional(),
  technologies: z.array(z.string()).optional(),
  isCurrent: z.boolean().optional(),
});

export type UpdateExperienceRequestDto = z.infer<typeof UpdateExperienceDto>;

// Add Education DTO
export const AddEducationDto = z.object({
  school: z.string().min(1, 'School is required').max(200, 'School must not exceed 200 characters'),
  degree: z.string().max(100, 'Degree must not exceed 100 characters').optional(),
  fieldOfStudy: z.string().max(100, 'Field of study must not exceed 100 characters').optional(),
  startDate: z.string().datetime('Please enter a valid start date'),
  endDate: z.string().datetime('Please enter a valid end date').optional(),
  grade: z.string().max(20, 'Grade must not exceed 20 characters').optional(),
});

export type AddEducationRequestDto = z.infer<typeof AddEducationDto>;

// Update Education DTO
export const UpdateEducationDto = z.object({
  school: z.string().min(1, 'School is required').max(200, 'School must not exceed 200 characters').optional(),
  degree: z.string().max(100, 'Degree must not exceed 100 characters').optional(),
  fieldOfStudy: z.string().max(100, 'Field of study must not exceed 100 characters').optional(),
  startDate: z.string().datetime('Please enter a valid start date').optional(),
  endDate: z.string().datetime('Please enter a valid end date').optional(),
  grade: z.string().max(20, 'Grade must not exceed 20 characters').optional(),
});

export type UpdateEducationRequestDto = z.infer<typeof UpdateEducationDto>;

// Update Skills DTO
export const UpdateSkillsDto = z.object({
  skills: z.array(z.string()).min(0, 'Skills must be an array'),
});

export type UpdateSkillsRequestDto = z.infer<typeof UpdateSkillsDto>;

// Update Languages DTO
export const UpdateLanguagesDto = z.object({
  languages: z.array(z.string()).min(0, 'Languages must be an array'),
});

export type UpdateLanguagesRequestDto = z.infer<typeof UpdateLanguagesDto>;

// Upload Resume DTO
export const UploadResumeDto = z.object({
  url: z.string().url('Please enter a valid resume URL'),
  fileName: z.string().min(1, 'File name is required'),
});

export type UploadResumeRequestDto = z.infer<typeof UploadResumeDto>;
