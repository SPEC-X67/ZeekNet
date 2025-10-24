import { ICompanyListingRepository, ICompanyVerificationRepository } from '../../../domain/interfaces/repositories';
import { IGetCompaniesWithVerificationUseCase, CompanyQueryOptions, PaginatedCompaniesWithVerification } from '../../../domain/interfaces/use-cases';

export class GetCompaniesWithVerificationUseCase implements IGetCompaniesWithVerificationUseCase {
  constructor(
    private readonly _companyListingRepository: ICompanyListingRepository,
    private readonly _companyVerificationRepository: ICompanyVerificationRepository
  ) {}

  async execute(options: CompanyQueryOptions): Promise<PaginatedCompaniesWithVerification> {
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

    const companiesWithVerification = await Promise.all(
      result.companies.map(async (company) => {
        const verification = await this._companyVerificationRepository.getVerificationByCompanyId(company.id);

        const companyData = company.toJSON();
        return {
          id: companyData.id as string,
          userId: companyData.userId as string,
          companyName: companyData.companyName as string,
          logo: companyData.logo as string,
          websiteLink: companyData.websiteLink as string,
          employeeCount: companyData.employeeCount as number,
          industry: companyData.industry as string,
          organisation: companyData.organisation as string,
          aboutUs: companyData.aboutUs as string,
          isVerified: companyData.isVerified as 'pending' | 'rejected' | 'verified',
          isBlocked: companyData.isBlocked as boolean,
          createdAt: companyData.createdAt as string,
          updatedAt: companyData.updatedAt as string,
          ...(verification && {
            verification: {
              taxId: verification.taxId,
              businessLicenseUrl: verification.businessLicenseUrl,
            },
          }),
        };
      })
    );

    return {
      companies: companiesWithVerification,
      total: result.total,
      page,
      limit,
      totalPages: Math.ceil(result.total / limit),
    };
  }
}
