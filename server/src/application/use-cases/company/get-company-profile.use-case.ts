import { ICompanyProfileRepository, ICompanyContactRepository, ICompanyTechStackRepository, ICompanyOfficeLocationRepository, ICompanyBenefitsRepository, ICompanyWorkplacePicturesRepository } from '../../../domain/interfaces/repositories';
import { CompanyProfile, CompanyContact, CompanyTechStack, CompanyOfficeLocation, CompanyBenefits, CompanyWorkplacePictures } from '../../../domain/entities';

interface CompanyProfileWithDetails {
  profile: CompanyProfile;
  contact: CompanyContact | null;
  locations: CompanyOfficeLocation[];
  techStack: CompanyTechStack[];
  benefits: CompanyBenefits[];
  workplacePictures: CompanyWorkplacePictures[];
}

export class GetCompanyProfileUseCase {
  constructor(
    private readonly _companyProfileRepository: ICompanyProfileRepository,
    private readonly _companyContactRepository: ICompanyContactRepository,
    private readonly _companyTechStackRepository: ICompanyTechStackRepository,
    private readonly _companyOfficeLocationRepository: ICompanyOfficeLocationRepository,
    private readonly _companyBenefitsRepository: ICompanyBenefitsRepository,
    private readonly _companyWorkplacePicturesRepository: ICompanyWorkplacePicturesRepository,
  ) {}

  async execute(userId: string): Promise<CompanyProfileWithDetails | null> {
    const profile = await this._companyProfileRepository.getProfileByUserId(userId);
    if (!profile) return null;

    const [contact, locations, techStack, benefits, workplacePictures] = await Promise.all([
      this._companyContactRepository.findByCompanyId(profile.id),
      this._companyOfficeLocationRepository.findByCompanyId(profile.id),
      this._companyTechStackRepository.findByCompanyId(profile.id),
      this._companyBenefitsRepository.findByCompanyId(profile.id),
      this._companyWorkplacePicturesRepository.findByCompanyId(profile.id),
    ]);

    return {
      profile,
      contact,
      locations,
      techStack,
      benefits,
      workplacePictures,
    };
  }
}
