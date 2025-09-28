import {
  CompanyProfile,
  CompanyContact,
  CompanyLocation,
  CompanyVerification,
} from '../entities/company-profile.entity';

export interface ICompanyProfileRepository {
  createProfile(
    profile: {
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
    },
  ): Promise<CompanyProfile>;
  
  getProfileByUserId(userId: string): Promise<CompanyProfile | null>;
  getProfileById(profileId: string): Promise<CompanyProfile | null>;
  updateProfile(
    profileId: string,
    updates: Partial<CompanyProfile>,
  ): Promise<CompanyProfile>;
  deleteProfile(profileId: string): Promise<void>;
  existsByUserId(userId: string): Promise<boolean>;
}

export interface ICompanyContactRepository {
  createContact(
    contact: Omit<CompanyContact, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<CompanyContact>;
  
  getContactByCompanyId(companyId: string): Promise<CompanyContact | null>;
  updateContact(
    companyId: string,
    updates: Partial<CompanyContact>,
  ): Promise<CompanyContact>;
  deleteContact(companyId: string): Promise<void>;
  existsByCompanyId(companyId: string): Promise<boolean>;
}

export interface ICompanyLocationRepository {
  createLocation(
    location: Omit<CompanyLocation, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<CompanyLocation>;
  
  getLocationsByCompanyId(companyId: string): Promise<CompanyLocation[]>;
  getLocationById(locationId: string): Promise<CompanyLocation | null>;
  updateLocation(
    locationId: string,
    updates: Partial<CompanyLocation>,
  ): Promise<CompanyLocation>;
  deleteLocation(locationId: string): Promise<void>;
  deleteLocations(companyId: string): Promise<void>;
  getHeadquartersByCompanyId(companyId: string): Promise<CompanyLocation | null>;
}

export interface ICompanyListingRepository {
  getAllCompanies(options: {
    page: number;
    limit: number;
    search?: string;
    industry?: string;
    isVerified?: 'pending' | 'rejected' | 'verified';
    isBlocked?: boolean;
    sortBy?: 'createdAt' | 'companyName' | 'employeeCount';
    sortOrder?: 'asc' | 'desc';
  }): Promise<{ companies: CompanyProfile[]; total: number }>;
  
  getCompaniesByIndustry(industry: string, limit?: number): Promise<CompanyProfile[]>;
  getVerifiedCompanies(limit?: number): Promise<CompanyProfile[]>;
  searchCompanies(query: string, limit?: number): Promise<CompanyProfile[]>;
}

export interface ICompanyVerificationRepository {
  createVerification(
    verification: Omit<CompanyVerification, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<CompanyVerification>;
  
  getVerificationByCompanyId(companyId: string): Promise<CompanyVerification | null>;
  updateVerificationStatus(
    companyId: string,
    isVerified: 'pending' | 'rejected' | 'verified',
  ): Promise<void>;
  updateVerification(
    companyId: string,
    updates: Partial<CompanyVerification>,
  ): Promise<CompanyVerification>;
  deleteVerification(companyId: string): Promise<void>;
  getPendingVerifications(): Promise<CompanyVerification[]>;
}

export interface ICompanyRepository extends 
  ICompanyProfileRepository, 
  ICompanyContactRepository, 
  ICompanyLocationRepository, 
  ICompanyListingRepository, 
  ICompanyVerificationRepository {}