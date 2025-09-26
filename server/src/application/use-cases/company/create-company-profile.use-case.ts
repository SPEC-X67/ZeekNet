import { injectable, inject } from 'inversify';
import { SimpleCompanyProfileRequestDto } from '../../dto/company/create-company.dto';
import { TYPES } from '../../../infrastructure/di/types';
import { ICompanyRepository } from '../../../domain/repositories';
import { CompanyProfile } from '../../../domain/entities';

@injectable()
export class CreateCompanyProfileUseCase {
  constructor(
    @inject(TYPES.CompanyRepository)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute(
    userId: string,
    data: SimpleCompanyProfileRequestDto,
  ): Promise<CompanyProfile> {
    const profileDataObj = {
      userId,
      companyName: data.company_name,
      logo: data.logo || '',
      banner: '',
      websiteLink: data.website || '',
      employeeCount: data.employees ? parseInt(data.employees.split('-')[0]) : 0,
      industry: data.industry,
      organisation: data.organisation,
      aboutUs: data.description,
      isVerified: 'pending' as const,
      isBlocked: false,
    };

    const profile = await this.companyRepository.createProfile(profileDataObj);

    await this.companyRepository.createContact({
      companyId: profile.id,
      email: data.email,
      phone: '',
      twitterLink: '',
      facebookLink: '',
      linkedin: '',
    });

    await this.companyRepository.createLocation({
      companyId: profile.id,
      location: data.location,
      officeName: 'Headquarters',
      address: data.location,
      isHeadquarters: true,
    });

    await this.companyRepository.createVerification({
      companyId: profile.id,
      taxId: data.tax_id,
      businessLicenseUrl: data.business_license || '',
    });

    return profile;
  }
}
