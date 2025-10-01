import { injectable, inject } from 'inversify';
import { SimpleUpdateCompanyProfileRequestDto } from '../../dto/company/company-profile.dto';
import { TYPES } from '../../../infrastructure/di/types';
import { ICompanyRepository } from '../../../domain/repositories';
import { CompanyProfileMapper } from '../../mappers/company-profile.mapper';
import { CompanyProfileResponseDto } from '../../mappers/types';


@injectable()
export class UpdateCompanyProfileUseCase {
  constructor(
    @inject(TYPES.CompanyRepository)
    private readonly companyRepository: ICompanyRepository,
    @inject(TYPES.CompanyProfileMapper)
    private readonly companyProfileMapper: CompanyProfileMapper,
  ) {}

  async execute(
    userId: string,
    data: { profile: SimpleUpdateCompanyProfileRequestDto },
  ): Promise<CompanyProfileResponseDto> {
    const existingProfile = await this.companyRepository.getProfileByUserId(userId);
    if (!existingProfile) {
      throw new Error('Company profile not found');
    }

    if (data.profile) {
      
      
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
      
    }


    const updatedProfile = await this.companyRepository.getProfileByUserId(userId);
    if (!updatedProfile) {
      throw new Error('Failed to retrieve updated profile');
    }

    return this.companyProfileMapper.toDto(updatedProfile);
  }
}