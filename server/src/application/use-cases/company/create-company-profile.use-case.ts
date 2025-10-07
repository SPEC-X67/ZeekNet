import { SimpleCompanyProfileRequestDto } from '../../dto/company/create-company.dto';
import { ICompanyRepository } from '../../../domain/interfaces/repositories';
import { ICreateCompanyProfileUseCase } from '../../../domain/interfaces/use-cases';
import { CompanyProfileMapper } from '../../mappers';
import { CompanyProfileResponseDto } from '../../mappers/types';

export class CreateCompanyProfileUseCase implements ICreateCompanyProfileUseCase {
  constructor(
    private readonly _companyRepository: ICompanyRepository,
    private readonly _companyProfileMapper: CompanyProfileMapper,
  ) {}

  async execute(
    userId: string,
    data: SimpleCompanyProfileRequestDto,
  ): Promise<CompanyProfileResponseDto> {
    const profileData = this._companyProfileMapper.toDomain(data, userId);
    const contactData = this._companyProfileMapper.toContactData(data, '');
    const locationData = this._companyProfileMapper.toLocationData(data, '');
    const verificationData = this._companyProfileMapper.toVerificationData(data, '');

    const profile = await this._companyRepository.createProfile(profileData);

    contactData.companyId = profile.id;
    await this._companyRepository.createContact(contactData);

    locationData.companyId = profile.id;
    await this._companyRepository.createLocation(locationData);

    verificationData.companyId = profile.id;
    await this._companyRepository.createVerification(verificationData);

    return this._companyProfileMapper.toDto(profile);
  }
}
