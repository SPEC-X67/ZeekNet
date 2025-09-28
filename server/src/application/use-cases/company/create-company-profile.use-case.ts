import { injectable, inject } from 'inversify';
import { SimpleCompanyProfileRequestDto } from '../../dto/company/create-company.dto';
import { TYPES } from '../../../infrastructure/di/types';
import { ICompanyRepository } from '../../../domain/repositories';
import { CompanyProfile } from '../../../domain/entities';
import { CompanyProfileMapper } from '../../mappers';

@injectable()
export class CreateCompanyProfileUseCase {
  constructor(
    @inject(TYPES.CompanyRepository)
    private readonly companyRepository: ICompanyRepository,
    @inject(TYPES.CompanyProfileMapper)
    private readonly companyProfileMapper: CompanyProfileMapper,
  ) {}

  async execute(
    userId: string,
    data: SimpleCompanyProfileRequestDto,
  ): Promise<CompanyProfile> {
    const profileData = this.companyProfileMapper.toDomain(data, userId);
    const contactData = this.companyProfileMapper.toContactData(data, '');
    const locationData = this.companyProfileMapper.toLocationData(data, '');
    const verificationData = this.companyProfileMapper.toVerificationData(data, '');

    const profile = await this.companyRepository.createProfile(profileData);

    contactData.companyId = profile.id;
    await this.companyRepository.createContact(contactData);

    locationData.companyId = profile.id;
    await this.companyRepository.createLocation(locationData);

    verificationData.companyId = profile.id;
    await this.companyRepository.createVerification(verificationData);

    return profile;
  }
}
