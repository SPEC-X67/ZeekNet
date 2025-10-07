import { ICompanyRepository } from '../../../domain/interfaces/repositories';
import { CompanyProfile } from '../../../domain/entities';
import { ICompanyContactRepository } from '../../../domain/interfaces/repositories/company-contact.repository';
import { ICompanyTechStackRepository } from '../../../domain/interfaces/repositories/company-tech-stack.repository';
import { ICompanyOfficeLocationRepository } from '../../../domain/interfaces/repositories/company-office-location.repository';
import { ICompanyBenefitsRepository } from '../../../domain/interfaces/repositories/company-benefits.repository';
import { ICompanyWorkplacePicturesRepository } from '../../../domain/interfaces/repositories/company-workplace-pictures.repository';
import { ICompanyTeamRepository } from '../../../domain/interfaces/repositories/company-team.repository';

interface CompanyProfileWithDetails {
  profile: CompanyProfile;
  contact: any | null;
  locations: any[];
  techStack: any[];
  benefits: any[];
  team: any[];
  workplacePictures: any[];
}

export class GetCompanyProfileUseCase {
  constructor(
    private readonly _companyRepository: ICompanyRepository,
    private readonly _companyContactRepository: ICompanyContactRepository,
    private readonly _companyTechStackRepository: ICompanyTechStackRepository,
    private readonly _companyOfficeLocationRepository: ICompanyOfficeLocationRepository,
    private readonly _companyBenefitsRepository: ICompanyBenefitsRepository,
    private readonly _companyWorkplacePicturesRepository: ICompanyWorkplacePicturesRepository,
    private readonly _companyTeamRepository: ICompanyTeamRepository,
  ) {}

  async execute(userId: string): Promise<CompanyProfileWithDetails | null> {
    const profile = await this._companyRepository.getProfileByUserId(userId);
    if (!profile) return null;

    const [
      contact,
      locations,
      techStack,
      benefits,
      team,
      workplacePictures
    ] = await Promise.all([
      this._companyContactRepository.findByCompanyId(profile.id),
      this._companyOfficeLocationRepository.findByCompanyId(profile.id),
      this._companyTechStackRepository.findByCompanyId(profile.id),
      this._companyBenefitsRepository.findByCompanyId(profile.id),
      this._companyTeamRepository.findByCompanyId(profile.id),
      this._companyWorkplacePicturesRepository.findByCompanyId(profile.id)
    ]);

    return {
      profile,
      contact: contact.length > 0 ? contact[0] : null,
      locations,
      techStack,
      benefits,
      team,
      workplacePictures,
    };
  }
}
