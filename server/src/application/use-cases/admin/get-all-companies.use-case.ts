import { GetAllCompaniesRequestDto } from '../../dto/admin/user-management.dto';
import { ICompanyRepository } from '../../../domain/interfaces/repositories';
import { CompanyProfileMapper } from '../../mappers/company-profile.mapper';
import { CompanyProfileResponseDto } from '../../mappers/types';

interface GetAllCompaniesResult {
  companies: CompanyProfileResponseDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export class GetAllCompaniesUseCase {
  constructor(
    private readonly _companyRepository: ICompanyRepository,
    private readonly _companyProfileMapper: CompanyProfileMapper,
  ) {}

  async execute(options: GetAllCompaniesRequestDto): Promise<GetAllCompaniesResult> {
    const convertedOptions = {
      page: parseInt(options.page),
      limit: parseInt(options.limit),
      search: options.search,
      industry: options.industry,
      isVerified: options.isVerified,
      isBlocked: options.isBlocked ? options.isBlocked === 'true' : undefined,
    };
    const result = await this._companyRepository.getAllCompanies(convertedOptions);
    return {
      companies: result.companies.map(company => this._companyProfileMapper.toDto(company)),
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
}
