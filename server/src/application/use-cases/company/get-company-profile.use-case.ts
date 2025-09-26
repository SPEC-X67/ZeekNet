import { injectable, inject } from 'inversify';
import { TYPES } from '../../../infrastructure/di/types';
import { ICompanyRepository } from '../../../domain/repositories';
import { CompanyProfile, CompanyContact, CompanyLocation } from '../../../domain/entities';

interface CompanyProfileWithDetails {
  profile: CompanyProfile;
  contact: CompanyContact | null;
  locations: CompanyLocation[];
}

@injectable()
export class GetCompanyProfileUseCase {
  constructor(
    @inject(TYPES.CompanyRepository)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute(userId: string): Promise<CompanyProfileWithDetails | null> {
    const profile = await this.companyRepository.getProfileByUserId(userId);
    if (!profile) return null;

    const contact = await this.companyRepository.getContactByCompanyId(profile.id);
    const locations = await this.companyRepository.getLocationsByCompanyId(profile.id);

    return {
      profile,
      contact,
      locations,
    };
  }
}
