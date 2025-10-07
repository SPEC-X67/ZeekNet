import { ICompanyListingRepository } from '../../../domain/interfaces/repositories';
import { IGetCompaniesWithVerificationUseCase, CompanyQueryOptions, PaginatedCompanies } from '../../../domain/interfaces/use-cases';

export class GetCompaniesWithVerificationUseCase implements IGetCompaniesWithVerificationUseCase {
  constructor(
    private readonly _companyListingRepository: ICompanyListingRepository,
  ) {}

  async execute(options: CompanyQueryOptions): Promise<PaginatedCompanies> {
    const page = options.page || 1;
    const limit = options.limit || 10;
    
    const convertedOptions = {
      page,
      limit,
      search: options.search,
      isVerified: options.isVerified,
      isBlocked: options.isBlocked,
      sortBy: options.sortBy as 'createdAt' | 'companyName' | 'employeeCount' | undefined,
      sortOrder: options.sortOrder,
    };

    const result = await this._companyListingRepository.getAllCompanies(convertedOptions);

    return {
      companies: result.companies,
      total: result.total,
      page,
      limit,
      totalPages: Math.ceil(result.total / limit),
    };
  }
}
