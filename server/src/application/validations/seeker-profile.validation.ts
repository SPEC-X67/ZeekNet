import { z } from 'zod';
import { EducationResponseDto } from '../dtos/seeker-education.dto';
import { ExperienceResponseDto } from '../dtos/seeker-experience.dto';

export const SocialLinkSchema = z.object({
  name: z.string().min(1, 'Social link name is required'),
  link: z.string().url('Please enter a valid URL'),
});
export const CreateSeekerProfileRequestSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  headline: z.string().max(100, 'Headline must not exceed 100 characters').optional(),
  summary: z.string().max(2000, 'Summary must not exceed 2000 characters').optional(),
  location: z.string().max(100, 'Location must not exceed 100 characters').optional(),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number').optional(),
  email: z.string().email('Please enter a valid email address').optional(),
  dateOfBirth: z.string().date('Please enter a valid date of birth').optional(),
  gender: z.string().max(50, 'Gender must not exceed 50 characters').optional(),
  skills: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
  socialLinks: z.array(SocialLinkSchema).default([]),
});
export const CreateSeekerProfileSchema = CreateSeekerProfileRequestSchema;
export const DateStringSchema = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), 'Please enter a valid date of birth');
export const UpdateSeekerProfileRequestSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  headline: z.string().max(100, 'Headline must not exceed 100 characters').optional(),
  summary: z.string().max(2000, 'Summary must not exceed 2000 characters').optional(),
  location: z.string().max(100, 'Location must not exceed 100 characters').optional(),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number').optional(),
  email: z.string().email('Please enter a valid email address').optional(),
  dateOfBirth: DateStringSchema.optional(),
  gender: z.string().max(50, 'Gender must not exceed 50 characters').optional(),
  skills: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  socialLinks: z.array(SocialLinkSchema).optional(),
  name: z.string().min(1, 'Name is required').max(100, 'Name must not exceed 100 characters').optional(),
});
export const UpdateSeekerProfileSchema = UpdateSeekerProfileRequestSchema;
export const UpdateSkillsRequestSchema = z.object({
  skills: z.array(z.string()).min(0, 'Skills must be an array'),
});
export const UpdateSkillsSchema = UpdateSkillsRequestSchema;
export const UpdateLanguagesRequestSchema = z.object({
  languages: z.array(z.string()).min(0, 'Languages must be an array'),
});
export const UpdateLanguagesSchema = UpdateLanguagesRequestSchema;
