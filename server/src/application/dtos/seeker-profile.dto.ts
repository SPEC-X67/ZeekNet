import { CreateSeekerProfileRequestSchema, UpdateSeekerProfileRequestSchema, UpdateSkillsRequestSchema, UpdateLanguagesRequestSchema } from 'src/application/validations/seeker-profile.validation';
import { z } from 'zod';
import { EducationResponseDto } from './seeker-education.dto';
import { ExperienceResponseDto } from './seeker-experience.dto';

export type CreateSeekerProfileRequestDto = z.infer<typeof CreateSeekerProfileRequestSchema>;
export type UpdateSeekerProfileRequestDto = z.infer<typeof UpdateSeekerProfileRequestSchema>;
export type UpdateSkillsRequestDto = z.infer<typeof UpdateSkillsRequestSchema>;
export type UpdateLanguagesRequestDto = z.infer<typeof UpdateLanguagesRequestSchema>;
export interface ResumeMetaResponseDto {
  url: string;
  fileName: string;
  uploadedAt: string;
}
export interface SocialLinkResponseDto {
  name: string;
  link: string;
}
export interface SeekerProfileResponseDto {
  id: string;
  userId: string;
  name: string;
  headline: string | null;
  summary: string | null;
  location: string | null;
  phone: string | null;
  email: string | null;
  avatarUrl: string | null;
  bannerUrl: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  skills: string[];
  languages: string[];
  socialLinks: SocialLinkResponseDto[];
  resume: ResumeMetaResponseDto | null;
  experiences: ExperienceResponseDto[];
  education: EducationResponseDto[];
  createdAt: string;
  updatedAt: string;
}
