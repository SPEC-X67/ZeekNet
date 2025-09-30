import { injectable } from 'inversify';
import { SimpleCompanyProfileRequestDto } from '../dto/company/create-company.dto';
import { CompanyProfile, CompanyContact, CompanyLocation } from '../../domain/entities/company-profile.entity';
import {
  CompanyProfileData,
  CompanyContactData,
  CompanyLocationData,
  CompanyVerificationData,
  CompanyProfileResponseDto,
  CompanyContactResponseDto,
  CompanyLocationResponseDto,
  CompanyProfileWithDetailsResponseDto
} from './types';

interface CompanyProfileWithDetails {
  profile: CompanyProfile;
  contact: any | null;
  locations: any[];
  techStack: any[];
  benefits: any[];
  team: any[];
  workplacePictures: any[];
  jobPostings?: any[];
}

@injectable()
export class CompanyProfileMapper {
  
  toDomain(dto: SimpleCompanyProfileRequestDto, userId: string): CompanyProfileData {
    return {
      userId,
      companyName: dto.company_name,
      logo: dto.logo || '',
      banner: '',
      websiteLink: dto.website || '',
      employeeCount: this.parseEmployeeCount(dto.employees),
      industry: dto.industry,
      organisation: dto.organisation,
      aboutUs: dto.description,
      isVerified: 'pending' as const,
      isBlocked: false,
    };
  }

  toContactData(dto: SimpleCompanyProfileRequestDto, companyId: string): CompanyContactData {
    return {
      companyId,
      email: dto.email,
      phone: '',
      twitterLink: '',
      facebookLink: '',
      linkedin: '',
    };
  }

  toLocationData(dto: SimpleCompanyProfileRequestDto, companyId: string): CompanyLocationData {
    return {
      companyId,
      location: dto.location,
      officeName: 'Headquarters',
      address: dto.location,
      isHeadquarters: true,
    };
  }

  toVerificationData(dto: SimpleCompanyProfileRequestDto, companyId: string): CompanyVerificationData {
    return {
      companyId,
      taxId: dto.tax_id,
      businessLicenseUrl: dto.business_license || '',
    };
  }

  private parseEmployeeCount(employees: string): number {
    if (!employees) return 0;
    const range = employees.split('-');
    return parseInt(range[0]) || 0;
  }

  toDto(domain: CompanyProfile): CompanyProfileResponseDto {
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

  toDetailedDto(domain: CompanyProfileWithDetails): CompanyProfileWithDetailsResponseDto {
    return {
      profile: this.toDto(domain.profile),
      contact: domain.contact ? this.mapContactToDto(domain.contact) : null,
      locations: domain.locations.map(location => this.mapLocationToDto(location)),
      techStack: domain.techStack.map(tech => ({
        id: tech.id,
        techStack: tech.techStack,
      })),
      benefits: domain.benefits.map(benefit => ({
        id: benefit.id,
        perk: benefit.perk,
        description: benefit.description,
      })),
      team: domain.team.map(member => ({
        id: member.id,
        name: member.name,
        role: member.role,
        avatar: member.avatar,
        instagram: member.instagram,
        linkedin: member.linkedin,
      })),
      workplacePictures: domain.workplacePictures.map(picture => ({
        id: picture.id,
        pictureUrl: picture.pictureUrl,
        caption: picture.caption,
      })),
      jobPostings: domain.jobPostings ? domain.jobPostings.map(job => ({
        id: job._id,
        title: job.title,
        description: job.description,
        location: job.location,
        employmentType: job.employment_types?.[0] || '',
        salaryMin: job.salary?.min,
        salaryMax: job.salary?.max,
        isActive: job.is_active,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt,
      })) : [],
    };
  }

  private mapContactToDto(contact: any): CompanyContactResponseDto {
    return {
      id: contact.id,
      email: contact.email,
      phone: contact.phone || '',
      twitter_link: contact.twitterLink || '',
      facebook_link: contact.facebookLink || '',
      linkedin: contact.linkedin || '',
    };
  }

  private mapLocationToDto(location: any): CompanyLocationResponseDto {
    return {
      id: location.id,
      location: location.location,
      office_name: location.officeName || '',
      address: location.address || '',
      is_headquarters: location.isHeadquarters,
    };
  }
}