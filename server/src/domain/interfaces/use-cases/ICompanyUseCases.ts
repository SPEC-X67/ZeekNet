import { 
  CompanyProfile, 
  CompanyContact, 
  CompanyTechStack, 
  CompanyOfficeLocation, 
  CompanyBenefits, 
  CompanyWorkplacePictures,
} from '../../entities';
import { JobPosting, PaginatedJobPostings, JobPostingFilters } from '../../entities/job-posting.entity';

export interface CreateCompanyProfileData {
  companyName: string;
  logo: string;
  banner: string;
  websiteLink: string;
  employeeCount: number;
  industry: string;
  organisation: string;
  aboutUs: string;
  foundedDate?: Date;
  phone?: string;
}

export interface UpdateCompanyProfileData {
  companyName?: string;
  logo?: string;
  banner?: string;
  websiteLink?: string;
  employeeCount?: number;
  industry?: string;
  organisation?: string;
  aboutUs?: string;
  foundedDate?: Date;
  phone?: string;
}

export interface CompanyVerificationData {
  taxId?: string;
  businessLicenseUrl?: string;
}

export interface CompanyContactData {
  twitterLink?: string;
  facebookLink?: string;
  linkedin?: string;
  email?: string;
  phone?: string;
}

export interface CompanyTechStackData {
  techStack: string;
}

export interface CompanyOfficeLocationData {
  location: string;
  officeName?: string;
  address?: string;
  isHeadquarters?: boolean;
}

export interface CompanyBenefitsData {
  perk: string;
  description?: string;
}

export interface CompanyWorkplacePicturesData {
  pictureUrl: string;
  caption?: string;
}

export interface CreateJobPostingData {
  title: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  nice_to_haves: string[];
  benefits: string[];
  salary: {
    min: number;
    max: number;
  };
  employment_types: string[];
  location: string;
  skills_required: string[];
  category_ids: string[];
}

export interface UpdateJobPostingData {
  title?: string;
  description?: string;
  responsibilities?: string[];
  qualifications?: string[];
  nice_to_haves?: string[];
  benefits?: string[];
  salary?: {
    min: number;
    max: number;
  };
  employment_types?: string[];
  location?: string;
  skills_required?: string[];
  category_ids?: string[];
  is_active?: boolean;
}

export interface ICreateCompanyProfileUseCase {
  execute(userId: string, profileData: CreateCompanyProfileData): Promise<CompanyProfile>;
}

export interface IUpdateCompanyProfileUseCase {
  execute(profileId: string, updates: UpdateCompanyProfileData): Promise<CompanyProfile>;
}

export interface IGetCompanyProfileUseCase {
  execute(userId: string): Promise<{
    profile: CompanyProfile;
    contact: CompanyContact | null;
    locations: CompanyOfficeLocation[];
    techStack: CompanyTechStack[];
    benefits: CompanyBenefits[];
    workplacePictures: CompanyWorkplacePictures[];
  } | null>;
}

export interface IReapplyCompanyVerificationUseCase {
  execute(userId: string, verificationData: CompanyVerificationData): Promise<CompanyProfile>;
}

export interface ICompanyContactUseCase {
  execute(companyId: string, contactData: CompanyContactData): Promise<CompanyContact>;
}

export interface ICompanyTechStackUseCase {
  execute(companyId: string, techStackData: CompanyTechStackData): Promise<CompanyTechStack>;
}

export interface ICompanyOfficeLocationUseCase {
  execute(companyId: string, locationData: CompanyOfficeLocationData): Promise<CompanyOfficeLocation>;
}

export interface ICompanyBenefitsUseCase {
  execute(companyId: string, benefitsData: CompanyBenefitsData): Promise<CompanyBenefits>;
}

export interface ICompanyWorkplacePicturesUseCase {
  execute(companyId: string, picturesData: CompanyWorkplacePicturesData): Promise<CompanyWorkplacePictures>;
}

export interface ICreateJobPostingUseCase {
  execute(companyId: string, jobData: CreateJobPostingData): Promise<JobPosting>;
}

export interface IGetJobPostingUseCase {
  execute(jobId: string): Promise<JobPosting>;
}

export interface IGetCompanyJobPostingsUseCase {
  execute(companyId: string, options: JobPostingFilters): Promise<PaginatedJobPostings>;
}

export interface IUpdateJobPostingUseCase {
  execute(jobId: string, updates: UpdateJobPostingData): Promise<JobPosting>;
}

export interface IDeleteJobPostingUseCase {
  execute(jobId: string): Promise<boolean>;
}

export interface IIncrementJobViewCountUseCase {
  execute(jobId: string, userRole: string): Promise<void>;
}

export interface IUpdateJobStatusUseCase {
  execute(jobId: string, isActive: boolean): Promise<JobPosting>;
}
