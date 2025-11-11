import { IJobApplicationRepository } from '../../../domain/interfaces/repositories/job-application/IJobApplicationRepository';
import { ICompanyProfileRepository } from '../../../domain/interfaces/repositories/company/ICompanyProfileRepository';
import { IGetApplicationsByCompanyUseCase, ApplicationFilters } from '../../../domain/interfaces/use-cases/IJobApplicationUseCases';
import { NotFoundError } from '../../../domain/errors/errors';
import { JobApplication } from '../../../domain/entities/job-application.entity';

export interface PaginatedApplications {
  applications: JobApplication[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class GetApplicationsByCompanyUseCase implements IGetApplicationsByCompanyUseCase {
  constructor(
    private readonly _jobApplicationRepository: IJobApplicationRepository,
    private readonly _companyProfileRepository: ICompanyProfileRepository,
  ) {}

  async execute(userId: string, filters: ApplicationFilters): Promise<PaginatedApplications> {
    // Get company profile
    const companyProfile = await this._companyProfileRepository.getProfileByUserId(userId);
    if (!companyProfile) {
      throw new NotFoundError('Company profile not found');
    }

    const page = filters.page || 1;
    const limit = filters.limit || 10;

    const result = await this._jobApplicationRepository.findByCompanyId(companyProfile.id, {
      job_id: filters.job_id,
      stage: filters.stage,
      search: filters.search,
      page,
      limit,
    });

    return {
      applications: result.applications,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit),
      },
    };
  }
}

