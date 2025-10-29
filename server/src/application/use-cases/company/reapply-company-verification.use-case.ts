import { ICompanyProfileRepository } from '../../../domain/interfaces/repositories/company/ICompanyProfileRepository';
import { ICompanyVerificationRepository } from '../../../domain/interfaces/repositories/company/ICompanyVerificationRepository';
import { CompanyVerificationData, IReapplyCompanyVerificationUseCase } from '../../../domain/interfaces/use-cases/ICompanyUseCases';
import { CompanyProfile } from '../../../domain/entities/company-profile.entity';

export class ReapplyCompanyVerificationUseCase implements IReapplyCompanyVerificationUseCase {
  constructor(
    private readonly _companyProfileRepository: ICompanyProfileRepository,
    private readonly _companyVerificationRepository: ICompanyVerificationRepository,
  ) {}

  async execute(userId: string, verificationData: CompanyVerificationData): Promise<CompanyProfile> {
    const existingProfile = await this._companyProfileRepository.getProfileByUserId(userId);
    if (!existingProfile) {
      throw new Error('Company profile not found');
    }

    if (existingProfile.isVerified !== 'rejected') {
      throw new Error('Only rejected companies can reapply for verification');
    }

    if (verificationData.taxId || verificationData.businessLicenseUrl) {
      await this._companyVerificationRepository.updateVerification(existingProfile.id, {
        taxId: verificationData.taxId,
        businessLicenseUrl: verificationData.businessLicenseUrl,
      });
    }

    await this._companyVerificationRepository.updateVerificationStatus(existingProfile.id, 'pending');

    const updatedProfile = await this._companyProfileRepository.getProfileByUserId(userId);
    if (!updatedProfile) {
      throw new Error('Failed to retrieve updated profile');
    }

    return updatedProfile;
  }
}
