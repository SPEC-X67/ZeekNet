import { SimpleCompanyProfileRequestDto } from '../../dto/company/create-company.dto';
import { ICompanyRepository } from '../../../domain/interfaces/repositories';
import { CompanyProfileMapper } from '../../mappers';
import { CompanyProfileResponseDto } from '../../mappers/types';

export class ReapplyCompanyVerificationUseCase {
  constructor(
    private readonly _companyRepository: ICompanyRepository,
    private readonly _companyProfileMapper: CompanyProfileMapper,
  ) {}

  async execute(
    userId: string,
    data: SimpleCompanyProfileRequestDto,
  ): Promise<CompanyProfileResponseDto> {

    const existingProfile = await this._companyRepository.getProfileByUserId(userId);
    if (!existingProfile) {
      throw new Error('Company profile not found');
    }

    if (existingProfile.isVerified !== 'rejected') {
      throw new Error('Only rejected companies can reapply for verification');
    }

    const profileData = this._companyProfileMapper.toDomain(data, userId);
    await this._companyRepository.updateProfile(existingProfile.id, {
      companyName: profileData.companyName,
      logo: profileData.logo,
      banner: profileData.banner,
      websiteLink: profileData.websiteLink,
      employeeCount: profileData.employeeCount,
      industry: profileData.industry,
      organisation: profileData.organisation,
      aboutUs: profileData.aboutUs,
    });

    const contactData = this._companyProfileMapper.toContactData(data, existingProfile.id);
    await this._companyRepository.updateContact(existingProfile.id, {
      email: contactData.email,
      phone: contactData.phone,
      twitterLink: contactData.twitterLink,
      facebookLink: contactData.facebookLink,
      linkedin: contactData.linkedin,
    });

    const locationData = this._companyProfileMapper.toLocationData(data, existingProfile.id);
    await this._companyRepository.deleteLocations(existingProfile.id);
    await this._companyRepository.createLocation(locationData);

    const verificationData = this._companyProfileMapper.toVerificationData(data, existingProfile.id);
    await this._companyRepository.updateVerification(existingProfile.id, {
      taxId: verificationData.taxId,
      businessLicenseUrl: verificationData.businessLicenseUrl,
    });

    await this._companyRepository.updateVerificationStatus(
      existingProfile.id,
      'pending'
    );

    const updatedProfile = await this._companyRepository.getProfileByUserId(userId);
    if (!updatedProfile) {
      throw new Error('Failed to retrieve updated profile');
    }

    return this._companyProfileMapper.toDto(updatedProfile);
  }
}