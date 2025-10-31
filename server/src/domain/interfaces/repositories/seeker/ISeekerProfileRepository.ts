import { SeekerProfile, ResumeMeta, SocialLink } from '../../../entities/seeker-profile.entity';

export interface ISeekerProfileRepository {
  createProfile(profile: {
    userId: string;
    headline?: string;
    summary?: string;
    location?: string;
    phone?: string;
    email?: string;
    avatarFileName?: string | null;
    bannerFileName?: string | null;
    skills?: string[];
    languages?: string[];
    socialLinks?: SocialLink[];
  }): Promise<SeekerProfile>;

  getProfileByUserId(userId: string): Promise<SeekerProfile | null>;
  getProfileById(profileId: string): Promise<SeekerProfile | null>;
  updateProfile(profileId: string, updates: Partial<SeekerProfile>): Promise<SeekerProfile>;
  deleteProfile(profileId: string): Promise<void>;
  existsByUserId(userId: string): Promise<boolean>;

          updateSkills(userId: string, skills: string[]): Promise<string[]>;

          updateLanguages(userId: string, languages: string[]): Promise<string[]>;

          updateSocialLinks(userId: string, socialLinks: SocialLink[]): Promise<SocialLink[]>;

  updateResume(userId: string, resume: ResumeMeta): Promise<ResumeMeta>;
  removeResume(userId: string): Promise<void>;
}