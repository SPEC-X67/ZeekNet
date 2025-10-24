import { SimpleCompanyProfileRequestDto } from '../dto/company/create-company.dto';
import { CompanyProfile } from '../../domain/entities/company-profile.entity';
import { CompanyContact, CompanyTechStack, CompanyOfficeLocation, CompanyBenefits, CompanyWorkplacePictures } from '../../domain/entities';
import { JobPosting } from '../../domain/entities/job-posting.entity';
import {
  CompanyProfileData,
  CompanyContactData,
  CompanyLocationData,
  CompanyVerificationData,
  CompanyProfileResponseDto,
  CompanyContactResponseDto,
  CompanyLocationResponseDto,
  CompanyProfileWithDetailsResponseDto,
} from './types';

interface CompanyProfileWithDetails {
  profile: CompanyProfile;
  contact: CompanyContact | null;
  locations: CompanyOfficeLocation[];
  techStack: CompanyTechStack[];
  benefits: CompanyBenefits[];
  workplacePictures: CompanyWorkplacePictures[];
  jobPostings?: JobPosting[];
}

export class CompanyProfileMapper {
  static toDomain(dto: SimpleCompanyProfileRequestDto, userId: string): CompanyProfileData {
    return {
      userId,
      companyName: dto.company_name,
      logo: dto.logo || '',
      banner: '',
      websiteLink: dto.website || '',
      employeeCount: CompanyProfileMapper.parseEmployeeCount(dto.employees),
      industry: dto.industry,
      organisation: dto.organisation,
      aboutUs: dto.description,
      isVerified: 'pending' as const,
      isBlocked: false,
    };
  }

  static toContactData(dto: SimpleCompanyProfileRequestDto, companyId: string): CompanyContactData {
    return {
      companyId,
      email: dto.email,
      phone: '',
      twitterLink: '',
      facebookLink: '',
      linkedin: '',
    };
  }

  static toLocationData(dto: SimpleCompanyProfileRequestDto, companyId: string): CompanyLocationData {
    return {
      companyId,
      location: dto.location,
      officeName: 'Headquarters',
      address: dto.location,
      isHeadquarters: true,
    };
  }

  static toVerificationData(dto: SimpleCompanyProfileRequestDto, companyId: string): CompanyVerificationData {
    return {
      companyId,
      taxId: dto.tax_id,
      businessLicenseUrl: dto.business_license || '',
    };
  }

  private static parseEmployeeCount(employees: string): number {
    if (!employees) return 0;
    const range = employees.split('-');
    return parseInt(range[0]) || 0;
  }

  static toDto(domain: CompanyProfile): CompanyProfileResponseDto {
    return {
      id: domain.id,
      company_name: domain.companyName,
      logo: domain.logo,
      banner: domain.banner,
      website_link: domain.websiteLink,
      employee_count: domain.employeeCount,
      industry: domain.industry,
      organisation: domain.organisation,
      about_us: domain.aboutUs,
      is_verified: domain.isVerified,
      is_blocked: domain.isBlocked,
      created_at: domain.createdAt,
      updated_at: domain.updatedAt,
    };
  }

  static toDetailedDto(domain: CompanyProfileWithDetails): CompanyProfileWithDetailsResponseDto {
    return {
      profile: CompanyProfileMapper.toDto(domain.profile),
      contact: domain.contact ? CompanyProfileMapper.mapContactToDto(domain.contact) : null,
      locations: domain.locations.map((location) => CompanyProfileMapper.mapLocationToDto(location)),
      techStack: domain.techStack.map((tech) => ({
        id: tech.id,
        techStack: tech.techStack,
      })),
      benefits: domain.benefits.map((benefit) => ({
        id: benefit.id,
        perk: benefit.perk,
        description: benefit.description || '',
      })),
      workplacePictures: domain.workplacePictures.map((picture) => ({
        id: picture.id,
        pictureUrl: picture.pictureUrl,
        caption: picture.caption,
      })),
      jobPostings: domain.jobPostings
        ? domain.jobPostings.map((job) => ({
            id: job._id,
            title: job.title,
            description: job.description,
            location: job.location,
            employmentType: job.employment_types?.[0] || '',
            salaryMin: job.salary?.min,
            salaryMax: job.salary?.max,
            isActive: job.is_active,
            createdAt: job.createdAt.toISOString(),
            updatedAt: job.updatedAt.toISOString(),
          }))
        : [],
    };
  }

  private static mapContactToDto(contact: CompanyContact): CompanyContactResponseDto {
    return {
      id: contact.id,
      email: contact.email || '',
      phone: contact.phone || '',
      twitter_link: contact.twitterLink || '',
      facebook_link: contact.facebookLink || '',
      linkedin: contact.linkedin || '',
    };
  }

  private static mapLocationToDto(location: CompanyOfficeLocation): CompanyLocationResponseDto {
    return {
      id: location.id,
      location: location.location,
      office_name: location.officeName || '',
      address: location.address || '',
      is_headquarters: location.isHeadquarters,
    };
  }
}
