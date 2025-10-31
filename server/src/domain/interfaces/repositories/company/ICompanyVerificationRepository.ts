import { CompanyVerification } from '../../../entities/company-profile.entity';

export interface ICompanyVerificationRepository {
  createVerification(verification: Omit<CompanyVerification, 'id' | 'createdAt' | 'updatedAt'>): Promise<CompanyVerification>;

  getVerificationByCompanyId(companyId: string): Promise<CompanyVerification | null>;
  updateVerificationStatus(companyId: string, isVerified: 'pending' | 'rejected' | 'verified', rejectionReason?: string): Promise<void>;
  updateVerification(companyId: string, updates: Partial<CompanyVerification>): Promise<CompanyVerification>;
  deleteVerification(companyId: string): Promise<void>;
  getPendingVerifications(): Promise<CompanyVerification[]>;
}