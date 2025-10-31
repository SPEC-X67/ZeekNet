import { ICompanyProfileRepository } from '../../../domain/interfaces/repositories/company/ICompanyProfileRepository';
import { ICompanyContactRepository } from '../../../domain/interfaces/repositories/company/ICompanyContactRepository';
import { ICompanyTechStackRepository } from '../../../domain/interfaces/repositories/company/ICompanyTechStackRepository';
import { ICompanyOfficeLocationRepository } from '../../../domain/interfaces/repositories/company/ICompanyOfficeLocationRepository';
import { ICompanyBenefitsRepository } from '../../../domain/interfaces/repositories/company/ICompanyBenefitsRepository';
import { ICompanyWorkplacePicturesRepository } from '../../../domain/interfaces/repositories/company/ICompanyWorkplacePicturesRepository';
import { ICompanyVerificationRepository } from '../../../domain/interfaces/repositories/company/ICompanyVerificationRepository';
import { CompanyProfile } from '../../../domain/entities/company-profile.entity';
import { CompanyContact } from '../../../domain/entities/company-contact.entity';
import { CompanyTechStack } from '../../../domain/entities/company-tech-stack.entity';
import { CompanyOfficeLocation } from '../../../domain/entities/company-office-location.entity';
import { CompanyBenefits } from '../../../domain/entities/company-benefits.entity';
import { CompanyWorkplacePictures } from '../../../domain/entities/company-workplace-pictures.entity';
import { CompanyVerification } from '../../../domain/entities/company-profile.entity';

interface CompanyProfileWithDetails {
  profile: CompanyProfile;
  contact: CompanyContact | null;
  locations: CompanyOfficeLocation[];
  techStack: CompanyTechStack[];
  benefits: CompanyBenefits[];
  workplacePictures: CompanyWorkplacePictures[];
  verification: CompanyVerification | null;
}

export class GetCompanyProfileUseCase {
  constructor(
    private readonly _companyProfileRepository: ICompanyProfileRepository,
    private readonly _companyContactRepository: ICompanyContactRepository,
    private readonly _companyTechStackRepository: ICompanyTechStackRepository,
    private readonly _companyOfficeLocationRepository: ICompanyOfficeLocationRepository,
    private readonly _companyBenefitsRepository: ICompanyBenefitsRepository,
    private readonly _companyWorkplacePicturesRepository: ICompanyWorkplacePicturesRepository,
    private readonly _companyVerificationRepository: ICompanyVerificationRepository,
  ) {}

  async execute(userId: string): Promise<CompanyProfileWithDetails | null> {
    const profile = await this._companyProfileRepository.getProfileByUserId(userId);
    if (!profile) return null;

    const [contact, locations, techStack, benefits, workplacePictures, verification] = await Promise.all([
      this._companyContactRepository.findByCompanyId(profile.id),
      this._companyOfficeLocationRepository.findByCompanyId(profile.id),
      this._companyTechStackRepository.findByCompanyId(profile.id),
      this._companyBenefitsRepository.findByCompanyId(profile.id),
      this._companyWorkplacePicturesRepository.findByCompanyId(profile.id),
      this._companyVerificationRepository.getVerificationByCompanyId(profile.id),
    ]);

    return {
      profile,
      contact,
      locations,
      techStack,
      benefits,
      workplacePictures,
      verification,
    };
  }
}