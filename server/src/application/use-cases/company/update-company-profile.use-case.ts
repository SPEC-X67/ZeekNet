import { injectable, inject } from 'inversify';
import { UpdateCompanyProfileRequestDto } from '../../dto/company/create-company.dto';
import { TYPES } from '../../../infrastructure/di/types';
import { ICompanyRepository } from '../../../domain/repositories';
import { CompanyProfile } from '../../../domain/entities';

interface OfficeLocationData {
  location: string;
  office_name: string;
  address: string;
  is_headquarters: boolean;
}

@injectable()
export class UpdateCompanyProfileUseCase {
  constructor(
    @inject(TYPES.CompanyRepository)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute(
    userId: string,
    data: UpdateCompanyProfileRequestDto,
  ): Promise<CompanyProfile> {
    const existingProfile = await this.companyRepository.getProfileByUserId(userId);
    if (!existingProfile) {
      throw new Error('Company profile not found');
    }

    if (data.profile) {
      await this.companyRepository.updateProfile(existingProfile.id, {
        companyName: data.profile.company_name,
        logo: data.profile.logo,
        banner: data.profile.banner,
        websiteLink: data.profile.website_link,
        employeeCount: data.profile.employee_count,
        industry: data.profile.industry,
        organisation: existingProfile.organisation, // Keep existing value
        aboutUs: data.profile.about_us,
      });
    }

    if (data.contact) {
      await this.companyRepository.updateContact(existingProfile.id, {
        email: data.contact.email,
        phone: data.contact.phone,
        twitterLink: data.contact.twitter_link,
        facebookLink: data.contact.facebook_link,
        linkedin: data.contact.linkedin,
      });
    }

    if (data.office_locations) {
      await this.companyRepository.deleteLocations(existingProfile.id);
      await Promise.all(
        data.office_locations.map((location: OfficeLocationData) =>
          this.companyRepository.createLocation({
            companyId: existingProfile.id,
            location: location.location,
            officeName: location.office_name,
            address: location.address,
            isHeadquarters: location.is_headquarters,
          }),
        ),
      );
    }

    const updatedProfile = await this.companyRepository.getProfileByUserId(userId);
    if (!updatedProfile) {
      throw new Error('Failed to retrieve updated profile');
    }

    return updatedProfile;
  }
}