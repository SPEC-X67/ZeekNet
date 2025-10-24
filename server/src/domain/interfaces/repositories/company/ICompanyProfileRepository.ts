import { CompanyProfile } from '../../../entities/company-profile.entity';

export interface ICompanyProfileRepository {
  createProfile(profile: {
    userId: string;
    companyName: string;
    logo: string;
    banner: string;
    websiteLink: string;
    employeeCount: number;
    industry: string;
    organisation: string;
    aboutUs: string;
    isVerified: 'pending' | 'rejected' | 'verified';
    isBlocked: boolean;
  }): Promise<CompanyProfile>;

  getProfileByUserId(userId: string): Promise<CompanyProfile | null>;
  getProfileById(profileId: string): Promise<CompanyProfile | null>;
  updateProfile(profileId: string, updates: Partial<CompanyProfile>): Promise<CompanyProfile>;
  deleteProfile(profileId: string): Promise<void>;
  existsByUserId(userId: string): Promise<boolean>;
}
