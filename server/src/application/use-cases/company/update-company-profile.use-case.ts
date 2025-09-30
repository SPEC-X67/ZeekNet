import { injectable, inject } from 'inversify';
import { SimpleUpdateCompanyProfileRequestDto } from '../../dto/company/company-profile.dto';
import { TYPES } from '../../../infrastructure/di/types';
import { ICompanyRepository } from '../../../domain/repositories';
import { CompanyProfile } from '../../../domain/entities';


@injectable()
export class UpdateCompanyProfileUseCase {
  constructor(
    @inject(TYPES.CompanyRepository)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute(
    userId: string,
    data: { profile: SimpleUpdateCompanyProfileRequestDto },
  ): Promise<CompanyProfile> {
    const existingProfile = await this.companyRepository.getProfileByUserId(userId);
    if (!existingProfile) {
      throw new Error('Company profile not found');
    }

    if (data.profile) {
      console.log('Updating profile with data:', {
        profileId: existingProfile.id,
        updateData: {
          companyName: data.profile.company_name,
          logo: data.profile.logo,
          banner: data.profile.banner,
          websiteLink: data.profile.website_link,
          employeeCount: data.profile.employee_count,
          industry: data.profile.industry,
          organisation: data.profile.organisation || existingProfile.organisation,
          aboutUs: data.profile.about_us,
        }
      });
      
      console.log('Logo field details:', {
        logoFromRequest: data.profile.logo,
        logoType: typeof data.profile.logo,
        logoLength: data.profile.logo?.length
      });
      
      const updatedProfile = await this.companyRepository.updateProfile(existingProfile.id, {
        companyName: data.profile.company_name,
        logo: data.profile.logo,
        banner: data.profile.banner,
        websiteLink: data.profile.website_link,
        employeeCount: data.profile.employee_count,
        industry: data.profile.industry,
        organisation: data.profile.organisation || existingProfile.organisation,
        aboutUs: data.profile.about_us,
      });
      
      console.log('Profile updated successfully:', {
        id: updatedProfile.id,
        logo: updatedProfile.logo,
        aboutUs: updatedProfile.aboutUs
      });
    }

    // Note: Contact and office locations are handled by separate endpoints
    // This use case only handles profile updates

    const updatedProfile = await this.companyRepository.getProfileByUserId(userId);
    if (!updatedProfile) {
      throw new Error('Failed to retrieve updated profile');
    }

    return updatedProfile;
  }
}