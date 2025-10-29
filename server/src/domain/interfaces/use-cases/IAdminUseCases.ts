import { User } from '../../entities/user.entity';
import { CompanyProfile } from '../../entities/company-profile.entity';
import { JobPosting, PaginatedJobPostings, JobPostingFilters } from '../../entities/job-posting.entity';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface PaginatedUsers {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CompanyWithVerification {
  id: string;
  userId: string;
  companyName: string;
  logo: string;
  websiteLink: string;
  employeeCount: number;
  industry: string;
  organisation: string;
  aboutUs: string;
  isVerified: 'pending' | 'rejected' | 'verified';
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  verification?: {
    taxId: string;
    businessLicenseUrl: string;
  };
}

export interface PaginatedCompanies {
  companies: CompanyProfile[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedCompaniesWithVerification {
  companies: CompanyWithVerification[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserQueryOptions {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  isBlocked?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CompanyQueryOptions {
  page?: number;
  limit?: number;
  search?: string;
  isVerified?: 'pending' | 'rejected' | 'verified';
  isBlocked?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IAdminLoginUseCase {
  execute(email: string, password: string): Promise<AuthResponse>;
}

export interface IGetAllUsersUseCase {
  execute(options: UserQueryOptions): Promise<PaginatedUsers>;
}

export interface IBlockUserUseCase {
  execute(userId: string, isBlocked: boolean): Promise<void>;
}

export interface IAdminGetUserByIdUseCase {
  execute(userId: string): Promise<User>;
}

export interface IGetAllCompaniesUseCase {
  execute(options: CompanyQueryOptions): Promise<PaginatedCompanies>;
}

export interface IGetCompaniesWithVerificationUseCase {
  execute(options: CompanyQueryOptions): Promise<PaginatedCompaniesWithVerification>;
}

export interface IVerifyCompanyUseCase {
  execute(companyId: string, isVerified: 'pending' | 'rejected' | 'verified'): Promise<void>;
}

export interface IBlockCompanyUseCase {
  execute(companyId: string, isBlocked: boolean): Promise<void>;
}

export interface IAdminGetAllJobsUseCase {
  execute(query: JobPostingFilters): Promise<PaginatedJobPostings>;
}

export interface IAdminGetJobByIdUseCase {
  execute(jobId: string): Promise<JobPosting>;
}

export interface IAdminUpdateJobStatusUseCase {
  execute(jobId: string, isActive: boolean): Promise<JobPosting>;
}

export interface IAdminDeleteJobUseCase {
  execute(jobId: string): Promise<boolean>;
}

export interface AdminJobStats {
  total: number;
  active: number;
  inactive: number;
  totalApplications: number;
  totalViews: number;
}

export interface IAdminGetJobStatsUseCase {
  execute(): Promise<AdminJobStats>;
}

// Additional interfaces that were missing
export interface IGetJobByIdUseCase {
  execute(jobId: string): Promise<JobPosting>;
}

export interface IGetJobStatsUseCase {
  execute(): Promise<AdminJobStats>;
}

export interface IUpdateJobStatusUseCase {
  execute(jobId: string, isActive: boolean): Promise<JobPosting>;
}

export interface IDeleteJobUseCase {
  execute(jobId: string): Promise<boolean>;
}