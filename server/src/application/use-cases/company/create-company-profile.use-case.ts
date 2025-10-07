import { 
  ICompanyProfileRepository,
  ICompanyContactRepository,
  ICompanyVerificationRepository,
  ICompanyOfficeLocationRepository,
} from '../../../domain/interfaces/repositories';
import { ICreateCompanyProfileUseCase, CreateCompanyProfileData } from '../../../domain/interfaces/use-cases';
import { CompanyProfile } from '../../../domain/entities/company-profile.entity';

export class CreateCompanyProfileUseCase implements ICreateCompanyProfileUseCase {
  constructor(
    private readonly _companyProfileRepository: ICompanyProfileRepository,
    private readonly _companyContactRepository: ICompanyContactRepository,
    private readonly _companyOfficeLocationRepository: ICompanyOfficeLocationRepository,
    private readonly _companyVerificationRepository: ICompanyVerificationRepository,
  ) {}

  async execute(
    userId: string,
    profileData: CreateCompanyProfileData,
  ): Promise<CompanyProfile> {
    const profile = await this._companyProfileRepository.createProfile({
      userId,
      companyName: profileData.companyName,
      logo: profileData.logo,
      banner: profileData.banner,
      websiteLink: profileData.websiteLink,
      employeeCount: profileData.employeeCount,
      industry: profileData.industry,
      organisation: profileData.organisation,
      aboutUs: profileData.aboutUs,
      isVerified: 'pending',
      isBlocked: false,
    });

    return profile;
  }
}
