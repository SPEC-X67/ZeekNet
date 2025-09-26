import { injectable, inject } from 'inversify';
import { GetAllCompaniesRequestDto } from '../../dto/admin/user-management.dto';
import { TYPES } from '../../../infrastructure/di/types';
import { ICompanyRepository } from '../../../domain/repositories';
import { CompanyProfile } from '../../../domain/entities';

interface GetAllCompaniesResult {
  companies: CompanyProfile[];
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
export class GetAllCompaniesUseCase {
  constructor(
    @inject(TYPES.CompanyRepository)
    private readonly companyRepository: ICompanyRepository,
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
    const result = await this.companyRepository.getAllCompanies(convertedOptions);
    return {
      companies: result.companies,
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
