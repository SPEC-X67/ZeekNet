import { ICompanyProfileRepository } from '../../../domain/interfaces/repositories/company/ICompanyProfileRepository';
import { ICompanyContactRepository } from '../../../domain/interfaces/repositories/company/ICompanyContactRepository';
import { ICompanyVerificationRepository } from '../../../domain/interfaces/repositories/company/ICompanyVerificationRepository';
import { ICompanyOfficeLocationRepository } from '../../../domain/interfaces/repositories/company/ICompanyOfficeLocationRepository';
import { CreateCompanyProfileData, ICreateCompanyProfileUseCase } from '../../../domain/interfaces/use-cases/ICompanyUseCases';
import { CompanyProfile } from '../../../domain/entities/company-profile.entity';
import { CompanyContact } from '../../../domain/entities/company-contact.entity';
import { CompanyOfficeLocation } from '../../../domain/entities/company-office-location.entity';

export class CreateCompanyProfileUseCase implements ICreateCompanyProfileUseCase {
  constructor(
    private readonly _companyProfileRepository: ICompanyProfileRepository,
    private readonly _companyContactRepository: ICompanyContactRepository,
    private readonly _companyOfficeLocationRepository: ICompanyOfficeLocationRepository,
    private readonly _companyVerificationRepository: ICompanyVerificationRepository,
  ) {}

  async execute(userId: string, profileData: CreateCompanyProfileData): Promise<CompanyProfile> {
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

    if (profileData.taxId || profileData.businessLicenseUrl) {
      await this._companyVerificationRepository.createVerification({
        companyId: profile.id,
        taxId: profileData.taxId || '',
        businessLicenseUrl: profileData.businessLicenseUrl || '',
      });
    }

    if (profileData.email) {
      const contact = CompanyContact.create({
        companyId: profile.id,
        email: profileData.email,
      });
      await this._companyContactRepository.create(contact);
    }

    if (profileData.location) {
      const location = CompanyOfficeLocation.create({
        companyId: profile.id,
        location: profileData.location,
        isHeadquarters: true,
      });
      await this._companyOfficeLocationRepository.create(location);
    }

    return profile;
  }
}
