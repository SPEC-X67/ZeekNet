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
  contact: CompanyContact | null;
  locations: CompanyLocation[];
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
    };
  }

  private mapContactToDto(contact: CompanyContact): CompanyContactResponseDto {
    return {
      id: contact.id,
      email: contact.email,
      phone: contact.phone,
      twitter_link: contact.twitterLink,
      facebook_link: contact.facebookLink,
      linkedin: contact.linkedin,
    };
  }

  private mapLocationToDto(location: CompanyLocation): CompanyLocationResponseDto {
    return {
      id: location.id,
      location: location.location,
      office_name: location.officeName,
      address: location.address,
      is_headquarters: location.isHeadquarters,
    };
  }
}