import { injectable, inject } from 'inversify';
import { TYPES } from '../../../infrastructure/di/types';
import { ICompanyRepository } from '../../../domain/repositories';
import { CompanyProfile } from '../../../domain/entities';
import { ICompanyContactRepository } from '../../../domain/repositories/company-contact.repository';
import { ICompanyTechStackRepository } from '../../../domain/repositories/company-tech-stack.repository';
import { ICompanyOfficeLocationRepository } from '../../../domain/repositories/company-office-location.repository';
import { ICompanyBenefitsRepository } from '../../../domain/repositories/company-benefits.repository';
import { ICompanyWorkplacePicturesRepository } from '../../../domain/repositories/company-workplace-pictures.repository';
import { ICompanyTeamRepository } from '../../../domain/repositories/company-team.repository';

interface CompanyProfileWithDetails {
  profile: CompanyProfile;
  contact: any | null;
  locations: any[];
  techStack: any[];
  benefits: any[];
  team: any[];
  workplacePictures: any[];
}

@injectable()
export class GetCompanyProfileUseCase {
  constructor(
    @inject(TYPES.CompanyRepository)
    private readonly companyRepository: ICompanyRepository,
    @inject(TYPES.CompanyContactRepository)
    private readonly companyContactRepository: ICompanyContactRepository,
    @inject(TYPES.CompanyTechStackRepository)
    private readonly companyTechStackRepository: ICompanyTechStackRepository,
    @inject(TYPES.CompanyOfficeLocationRepository)
    private readonly companyOfficeLocationRepository: ICompanyOfficeLocationRepository,
    @inject(TYPES.CompanyBenefitsRepository)
    private readonly companyBenefitsRepository: ICompanyBenefitsRepository,
    @inject(TYPES.CompanyWorkplacePicturesRepository)
    private readonly companyWorkplacePicturesRepository: ICompanyWorkplacePicturesRepository,
    @inject(TYPES.CompanyTeamRepository)
    private readonly companyTeamRepository: ICompanyTeamRepository,
  ) {}

  async execute(userId: string): Promise<CompanyProfileWithDetails | null> {
    const profile = await this.companyRepository.getProfileByUserId(userId);
    if (!profile) return null;

    // Fetch all company data in parallel
    const [
      contact,
      locations,
      techStack,
      benefits,
      team,
      workplacePictures
    ] = await Promise.all([
      this.companyContactRepository.findByCompanyId(profile.id),
      this.companyOfficeLocationRepository.findByCompanyId(profile.id),
      this.companyTechStackRepository.findByCompanyId(profile.id),
      this.companyBenefitsRepository.findByCompanyId(profile.id),
      this.companyTeamRepository.findByCompanyId(profile.id),
      this.companyWorkplacePicturesRepository.findByCompanyId(profile.id)
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
