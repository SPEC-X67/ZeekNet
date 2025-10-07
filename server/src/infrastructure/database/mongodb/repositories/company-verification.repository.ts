import { ICompanyVerificationRepository } from '../../../../domain/interfaces/repositories';
import { CompanyVerification } from '../../../../domain/entities';
import { CompanyVerificationModel } from '../models/company-verification.model';
import { CompanyProfileModel } from '../models/company-profile.model';
import { CompanyVerificationDocument, CompanyVerificationMapper } from '../mappers';

export class CompanyVerificationRepository implements ICompanyVerificationRepository {
  async createVerification(
    verification: Omit<CompanyVerification, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<CompanyVerification> {
    const created = await CompanyVerificationModel.create({
      ...verification,
      businessLicenseUrl: verification.businessLicenseUrl || '',
    });
    return CompanyVerificationMapper.toEntity(created as unknown as CompanyVerificationDocument);
  }

  async getVerificationByCompanyId(
    companyId: string,
  ): Promise<CompanyVerification | null> {
    const doc = await CompanyVerificationModel.findOne({ companyId }).exec();
    return doc ? CompanyVerificationMapper.toEntity(doc as unknown as CompanyVerificationDocument) : null;
  }

  async updateVerificationStatus(
    companyId: string,
    isVerified: 'pending' | 'rejected' | 'verified',
  ): Promise<void> {
    await CompanyProfileModel.findByIdAndUpdate(
      companyId,
      { isVerified },
    ).exec();
  }

  async updateVerification(
    companyId: string,
    updates: Partial<CompanyVerification>,
  ): Promise<CompanyVerification> {
    const updated = await CompanyVerificationModel.findOneAndUpdate(
      { companyId },
      updates,
      { new: true },
    ).exec();
    if (!updated) throw new Error('Verification not found');
    return CompanyVerificationMapper.toEntity(updated as unknown as CompanyVerificationDocument);
  }

  async deleteVerification(companyId: string): Promise<void> {
    await CompanyVerificationModel.findOneAndDelete({ companyId }).exec();
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

