import { injectable, inject } from 'inversify';
import { SimpleCompanyProfileRequestDto } from '../../dto/company/create-company.dto';
import { TYPES } from '../../../infrastructure/di/types';
import { ICompanyRepository } from '../../../domain/repositories';
import { CompanyProfileMapper } from '../../mappers';
import { CompanyProfileResponseDto } from '../../mappers/types';

@injectable()
export class ReapplyCompanyVerificationUseCase {
  constructor(
    @inject(TYPES.CompanyRepository)
    private readonly companyRepository: ICompanyRepository,
    @inject(TYPES.CompanyProfileMapper)
    private readonly companyProfileMapper: CompanyProfileMapper,
  ) {}

  async execute(
    userId: string,
    data: SimpleCompanyProfileRequestDto,
  ): Promise<CompanyProfileResponseDto> {

    const existingProfile = await this.companyRepository.getProfileByUserId(userId);
    if (!existingProfile) {
      throw new Error('Company profile not found');
    }

    if (existingProfile.isVerified !== 'rejected') {
      throw new Error('Only rejected companies can reapply for verification');
    }

    const profileData = this.companyProfileMapper.toDomain(data, userId);
    await this.companyRepository.updateProfile(existingProfile.id, {
      companyName: profileData.companyName,
      logo: profileData.logo,
      banner: profileData.banner,
      websiteLink: profileData.websiteLink,
      employeeCount: profileData.employeeCount,
      industry: profileData.industry,
      organisation: profileData.organisation,
      aboutUs: profileData.aboutUs,
    });

    const contactData = this.companyProfileMapper.toContactData(data, existingProfile.id);
    await this.companyRepository.updateContact(existingProfile.id, {
      email: contactData.email,
      phone: contactData.phone,
      twitterLink: contactData.twitterLink,
      facebookLink: contactData.facebookLink,
      linkedin: contactData.linkedin,
    });

    const locationData = this.companyProfileMapper.toLocationData(data, existingProfile.id);
    await this.companyRepository.deleteLocations(existingProfile.id);
    await this.companyRepository.createLocation(locationData);

    const verificationData = this.companyProfileMapper.toVerificationData(data, existingProfile.id);
    await this.companyRepository.updateVerification(existingProfile.id, {
      taxId: verificationData.taxId,
      businessLicenseUrl: verificationData.businessLicenseUrl,
    });

    await this.companyRepository.updateVerificationStatus(
      existingProfile.id,
      'pending'
    );

    const updatedProfile = await this.companyRepository.getProfileByUserId(userId);
    if (!updatedProfile) {
      throw new Error('Failed to retrieve updated profile');
    }

    return this.companyProfileMapper.toDto(updatedProfile);
  }
}