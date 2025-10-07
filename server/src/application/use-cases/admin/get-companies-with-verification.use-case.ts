import { injectable, inject } from 'inversify';
import { GetAllCompaniesRequestDto } from '../../dto/admin/user-management.dto';
import { TYPES } from '../../../infrastructure/di/types';
import { ICompanyRepository } from '../../../domain/repositories';
import { CompanyProfileMapper } from '../../mappers/company-profile.mapper';
import { CompanyProfileResponseDto } from '../../mappers/types';

interface CompanyWithVerification extends CompanyProfileResponseDto {
  verification?: {
    taxId: string;
    businessLicenseUrl: string;
  } | null;
}

interface GetAllCompaniesWithVerificationResult {
  companies: CompanyWithVerification[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

@injectable()
export class GetCompaniesWithVerificationUseCase {
  constructor(
    @inject(TYPES.CompanyRepository)
    private readonly companyRepository: ICompanyRepository,
    @inject(TYPES.CompanyProfileMapper)
    private readonly companyProfileMapper: CompanyProfileMapper,
  ) {}

  async execute(options: GetAllCompaniesRequestDto): Promise<GetAllCompaniesWithVerificationResult> {
    const convertedOptions = {
      page: parseInt(options.page),
      limit: parseInt(options.limit),
      search: options.search,
      industry: options.industry,
      isVerified: options.isVerified,
      isBlocked: options.isBlocked ? options.isBlocked === 'true' : undefined,
    };

    const result = await this.companyRepository.getAllCompanies(convertedOptions);

    const companiesWithVerification = await Promise.all(
      result.companies.map(async (company) => {
        const verification = await this.companyRepository.getVerificationByCompanyId(company.id);
        const companyDto = this.companyProfileMapper.toDto(company);
        return {
          ...companyDto,
          verification: verification ? {
            taxId: verification.taxId,
            businessLicenseUrl: verification.businessLicenseUrl,
          } : null,
        };
      }),
    );

    return {
      companies: companiesWithVerification,
      pagination: {
        page: convertedOptions.page,
        limit: convertedOptions.limit,
        total: result.total,
        totalPages: Math.ceil(result.total / convertedOptions.limit),
        hasNext: convertedOptions.page * convertedOptions.limit < result.total,
        hasPrev: convertedOptions.page > 1,
      },
    };
  }

  async executeForPending(): Promise<GetAllCompaniesWithVerificationResult> {
    const options = {
      page: '1',
      limit: '100',
      isVerified: 'pending' as const,
    };
    return this.execute(options);
  }

  async executeById(companyId: string): Promise<CompanyWithVerification | null> {
    const company = await this.companyRepository.getProfileById(companyId);
    if (!company) {
      return null;
    }

    const verification = await this.companyRepository.getVerificationByCompanyId(companyId);
    const companyDto = this.companyProfileMapper.toDto(company);
    return {
      ...companyDto,
      verification: verification ? {
        taxId: verification.taxId,
        businessLicenseUrl: verification.businessLicenseUrl,
      } : null,
    };
  }
}
