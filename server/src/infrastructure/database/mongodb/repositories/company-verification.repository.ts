import { ICompanyVerificationRepository } from '../../../../domain/interfaces/repositories/company/ICompanyVerificationRepository';
import { CompanyVerification } from '../../../../domain/entities/company-profile.entity';
import { CompanyVerificationModel, CompanyVerificationDocument } from '../models/company-verification.model';
import { CompanyProfileModel } from '../models/company-profile.model';
import { CompanyVerificationMapper } from '../mappers/company-verification.mapper';
import { RepositoryBase } from './base-repository';

export class CompanyVerificationRepository extends RepositoryBase<CompanyVerification, CompanyVerificationDocument> implements ICompanyVerificationRepository {
  constructor() {
    super(CompanyVerificationModel);
  }

  protected mapToEntity(doc: CompanyVerificationDocument): CompanyVerification {
    return CompanyVerificationMapper.toEntity(doc as unknown as Parameters<typeof CompanyVerificationMapper.toEntity>[0]);
  }

  async createVerification(verification: Omit<CompanyVerification, 'id' | 'createdAt' | 'updatedAt'>): Promise<CompanyVerification> {
    const dataWithDefaults = {
      ...verification,
      businessLicenseUrl: verification.businessLicenseUrl || '',
    };
    return await this.create(dataWithDefaults);
  }

  async getVerificationByCompanyId(companyId: string): Promise<CompanyVerification | null> {
    return await this.findOne({ companyId });
  }

  async updateVerificationStatus(companyId: string, isVerified: 'pending' | 'rejected' | 'verified', rejectionReason?: string): Promise<void> {
    const updateData: { isVerified: 'pending' | 'rejected' | 'verified'; rejectionReason?: string; updatedAt: Date } = {
      isVerified,
      updatedAt: new Date(),
    };
    
    if (isVerified === 'rejected' && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    } else if (isVerified !== 'rejected') {
      updateData.rejectionReason = undefined;
    }
    
    await CompanyProfileModel.findByIdAndUpdate(companyId, updateData).exec();
  }

  async updateVerification(companyId: string, updates: Partial<CompanyVerification>): Promise<CompanyVerification> {
    const updated = await this.model.findOneAndUpdate({ companyId }, { ...updates, updatedAt: new Date() }, { new: true }).exec();

    if (!updated) throw new Error('Verification not found');
    return this.mapToEntity(updated);
  }

  async deleteVerification(companyId: string): Promise<void> {
    await this.model.findOneAndDelete({ companyId }).exec();
  }

  async getPendingVerifications(): Promise<CompanyVerification[]> {
    const profiles = await CompanyProfileModel.find({ isVerified: 'pending' }).exec();
    const verifications: CompanyVerification[] = [];

    for (const profile of profiles) {
      const verification = await this.getVerificationByCompanyId(String(profile._id));
      if (verification) {
        verifications.push(verification);
      }
    }

    return verifications;
  }
}