import { SeekerProfile, ResumeMeta, SocialLink } from '../../../entities/seeker-profile.entity';

export interface ISeekerProfileRepository {
  createProfile(profile: {
    userId: string;
    headline?: string;
    summary?: string;
    location?: string;
    phone?: string;
    email: string;
    avatarUrl?: string;
    skills?: string[];
    socialLinks?: SocialLink[];
  }): Promise<SeekerProfile>;

  getProfileByUserId(userId: string): Promise<SeekerProfile | null>;
  getProfileById(profileId: string): Promise<SeekerProfile | null>;
  updateProfile(profileId: string, updates: Partial<SeekerProfile>): Promise<SeekerProfile>;
  deleteProfile(profileId: string): Promise<void>;
  existsByUserId(userId: string): Promise<boolean>;

  // Skills management
  updateSkills(userId: string, skills: string[]): Promise<string[]>;

  // Social Links management
  updateSocialLinks(userId: string, socialLinks: SocialLink[]): Promise<SocialLink[]>;

  // Resume management
  updateResume(userId: string, resume: ResumeMeta): Promise<ResumeMeta>;
  removeResume(userId: string): Promise<void>;
}
