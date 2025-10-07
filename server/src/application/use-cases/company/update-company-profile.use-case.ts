import { SimpleUpdateCompanyProfileRequestDto } from '../../dto/company/company-profile.dto';
import { ICompanyRepository } from '../../../domain/interfaces/repositories';
import { CompanyProfileMapper } from '../../mappers/company-profile.mapper';
import { CompanyProfileResponseDto } from '../../mappers/types';

export class UpdateCompanyProfileUseCase {
  constructor(
    private readonly _companyRepository: ICompanyRepository,
    private readonly _companyProfileMapper: CompanyProfileMapper,
  ) {}

  async execute(
    userId: string,
    data: { profile: SimpleUpdateCompanyProfileRequestDto },
  ): Promise<CompanyProfileResponseDto> {
    const existingProfile = await this._companyRepository.getProfileByUserId(userId);
    if (!existingProfile) {
      throw new Error('Company profile not found');
    }

    if (data.profile) {
      
      
      const updatedProfile = await this._companyRepository.updateProfile(existingProfile.id, {
        companyName: data.profile.company_name,
        logo: data.profile.logo,
        banner: data.profile.banner,
        websiteLink: data.profile.website_link,
        employeeCount: data.profile.employee_count,
        industry: data.profile.industry,
        organisation: data.profile.organisation || existingProfile.organisation,
        aboutUs: data.profile.about_us,
      });
      
    }


    const updatedProfile = await this._companyRepository.getProfileByUserId(userId);
    if (!updatedProfile) {
      throw new Error('Failed to retrieve updated profile');
    }

    return this._companyProfileMapper.toDto(updatedProfile);
  }
}