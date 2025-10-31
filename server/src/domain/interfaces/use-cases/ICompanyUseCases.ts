import { CompanyProfile, CompanyVerification } from '../../entities/company-profile.entity';
import { CompanyContact } from '../../entities/company-contact.entity';
import { CompanyTechStack } from '../../entities/company-tech-stack.entity';
import { CompanyOfficeLocation } from '../../entities/company-office-location.entity';
import { CompanyBenefits } from '../../entities/company-benefits.entity';
import { CompanyWorkplacePictures } from '../../entities/company-workplace-pictures.entity';
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
    verification: CompanyVerification | null;
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

export interface ICreateCompanyTechStackUseCase {
  execute(companyId: string, data: CompanyTechStackData): Promise<CompanyTechStack>;
}

export interface IUpdateCompanyTechStackUseCase {
  execute(techStackId: string, data: CompanyTechStackData): Promise<CompanyTechStack>;
}

export interface IDeleteCompanyTechStackUseCase {
  execute(techStackId: string): Promise<void>;
}

export interface IGetCompanyTechStackUseCase {
  executeByCompanyId(companyId: string): Promise<CompanyTechStack[]>;
  executeById(techStackId: string): Promise<CompanyTechStack | null>;
}

export interface ICreateCompanyOfficeLocationUseCase {
  execute(companyId: string, data: CompanyOfficeLocationData): Promise<CompanyOfficeLocation>;
}

export interface IUpdateCompanyOfficeLocationUseCase {
  execute(locationId: string, data: CompanyOfficeLocationData): Promise<CompanyOfficeLocation>;
}

export interface IDeleteCompanyOfficeLocationUseCase {
  execute(locationId: string): Promise<void>;
}

export interface IGetCompanyOfficeLocationUseCase {
  executeByCompanyId(companyId: string): Promise<CompanyOfficeLocation[]>;
  executeById(locationId: string): Promise<CompanyOfficeLocation | null>;
}

export interface ICreateCompanyBenefitUseCase {
  execute(companyId: string, data: CompanyBenefitsData): Promise<CompanyBenefits>;
}

export interface IUpdateCompanyBenefitUseCase {
  execute(benefitId: string, data: CompanyBenefitsData): Promise<CompanyBenefits>;
}

export interface IDeleteCompanyBenefitUseCase {
  execute(benefitId: string): Promise<void>;
}

export interface IGetCompanyBenefitUseCase {
  executeByCompanyId(companyId: string): Promise<CompanyBenefits[]>;
  executeById(benefitId: string): Promise<CompanyBenefits | null>;
}

export interface ICreateCompanyWorkplacePictureUseCase {
  execute(companyId: string, data: CompanyWorkplacePicturesData): Promise<CompanyWorkplacePictures>;
}

export interface IUpdateCompanyWorkplacePictureUseCase {
  execute(pictureId: string, data: CompanyWorkplacePicturesData): Promise<CompanyWorkplacePictures>;
}

export interface IDeleteCompanyWorkplacePictureUseCase {
  execute(pictureId: string): Promise<void>;
}

export interface IGetCompanyWorkplacePictureUseCase {
  executeByCompanyId(companyId: string): Promise<CompanyWorkplacePictures[]>;
  executeById(pictureId: string): Promise<CompanyWorkplacePictures | null>;
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