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

export interface EducationResponseDto {
  id: string;
  school: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
  grade?: string;
}

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
  headline: string | null;
  summary: string | null;
  location: string | null;
  phone: string | null;
  email: string;
  avatarUrl: string | null;
  skills: string[];
  socialLinks: SocialLinkResponseDto[];
  resume: ResumeMetaResponseDto | null;
  createdAt: string;
  updatedAt: string;
}
