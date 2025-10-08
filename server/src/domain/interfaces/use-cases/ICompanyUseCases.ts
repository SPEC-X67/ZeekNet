import { 
  CompanyProfile, 
  CompanyContact, 
  CompanyTechStack, 
  CompanyOfficeLocation, 
  CompanyBenefits, 
  CompanyWorkplacePictures,
} from '../../entities';
import { JobPosting, PaginatedJobPostings, JobPostingFilters } from '../../entities/job-posting.entity';
import { CompanyProfileResponseDto } from '../../../application/dto/company/company-response.dto';

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
  taxId?: string;
  businessLicenseUrl?: string;
  email?: string;
  location?: string;
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
  execute(userId: string, updates: { profile?: UpdateCompanyProfileData }): Promise<CompanyProfileResponseDto>;
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
  createContact(companyId: string, data: CompanyContactData): Promise<CompanyContact>;
  getContactsByCompanyId(companyId: string): Promise<CompanyContact[]>;
  updateContact(contactId: string, data: CompanyContactData): Promise<CompanyContact>;
  deleteContact(contactId: string): Promise<void>;
}

export interface ICompanyTechStackUseCase {
  createTechStack(companyId: string, data: CompanyTechStackData): Promise<CompanyTechStack>;
  getTechStackByCompanyId(companyId: string): Promise<CompanyTechStack[]>;
  getTechStackById(techStackId: string): Promise<CompanyTechStack | null>;
  updateTechStack(techStackId: string, data: CompanyTechStackData): Promise<CompanyTechStack>;
  deleteTechStack(techStackId: string): Promise<void>;
}

export interface ICompanyOfficeLocationUseCase {
  createOfficeLocation(companyId: string, data: CompanyOfficeLocationData): Promise<CompanyOfficeLocation>;
  getOfficeLocationsByCompanyId(companyId: string): Promise<CompanyOfficeLocation[]>;
  getOfficeLocationById(locationId: string): Promise<CompanyOfficeLocation | null>;
  updateOfficeLocation(locationId: string, data: CompanyOfficeLocationData): Promise<CompanyOfficeLocation>;
  deleteOfficeLocation(locationId: string): Promise<void>;
}

export interface ICompanyBenefitsUseCase {
  createBenefit(companyId: string, data: CompanyBenefitsData): Promise<CompanyBenefits>;
  getBenefitsByCompanyId(companyId: string): Promise<CompanyBenefits[]>;
  getBenefitById(benefitId: string): Promise<CompanyBenefits | null>;
  updateBenefit(benefitId: string, data: CompanyBenefitsData): Promise<CompanyBenefits>;
  deleteBenefit(benefitId: string): Promise<void>;
}

export interface ICompanyWorkplacePicturesUseCase {
  createPicture(companyId: string, data: CompanyWorkplacePicturesData): Promise<CompanyWorkplacePictures>;
  getPicturesByCompanyId(companyId: string): Promise<CompanyWorkplacePictures[]>;
  getPictureById(pictureId: string): Promise<CompanyWorkplacePictures | null>;
  updatePicture(pictureId: string, data: CompanyWorkplacePicturesData): Promise<CompanyWorkplacePictures>;
  deletePicture(pictureId: string): Promise<void>;
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
  execute(jobId: string, companyId: string): Promise<void>;
}

export interface IIncrementJobViewCountUseCase {
  execute(jobId: string, userRole: string): Promise<void>;
}

export interface IUpdateJobStatusUseCase {
  execute(jobId: string, isActive: boolean): Promise<JobPosting>;
}
