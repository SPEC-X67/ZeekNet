import { CompanyProfile } from '../../../entities/company-profile.entity';

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

