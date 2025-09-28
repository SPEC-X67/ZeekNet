import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController, AuthenticatedRequest } from '../../../shared/base/base-controller';
import { CreateJobPostingUseCase, GetJobPostingUseCase, GetCompanyJobPostingsUseCase, UpdateJobPostingUseCase, DeleteJobPostingUseCase, IncrementJobViewCountUseCase, UpdateJobStatusUseCase } from '../../../application/use-cases/company';
import { CreateJobPostingRequestDto, UpdateJobPostingRequestDto, JobPostingQueryRequestDto } from '../../../application/dto/job-posting/job-posting.dto';
import { TYPES } from '../../../infrastructure/di/types';
import { JobPostingMapper } from '../../../application/mappers';

@injectable()
export class CompanyJobPostingController extends BaseController {
  constructor(
    @inject(TYPES.CreateJobPostingUseCase) private createJobPostingUseCase: CreateJobPostingUseCase,
    @inject(TYPES.GetJobPostingUseCase) private getJobPostingUseCase: GetJobPostingUseCase,
    @inject(TYPES.GetCompanyJobPostingsUseCase) private getCompanyJobPostingsUseCase: GetCompanyJobPostingsUseCase,
    @inject(TYPES.UpdateJobPostingUseCase) private updateJobPostingUseCase: UpdateJobPostingUseCase,
    @inject(TYPES.DeleteJobPostingUseCase) private deleteJobPostingUseCase: DeleteJobPostingUseCase,
    @inject(TYPES.IncrementJobViewCountUseCase) private incrementJobViewCountUseCase: IncrementJobViewCountUseCase,
    @inject(TYPES.UpdateJobStatusUseCase) private updateJobStatusUseCase: UpdateJobStatusUseCase,
    @inject(TYPES.JobPostingMapper) private jobPostingMapper: JobPostingMapper,
  ) {
    super();
  }

  createJobPosting = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const companyId = req.user?.id;
      if (!companyId) {
        this.unauthorized(res, 'Company ID not found');
        return;
      }

      const createJobPostingDto: CreateJobPostingRequestDto = req.body;
      const jobPosting = await this.createJobPostingUseCase.execute(companyId, createJobPostingDto);
      const responseData = this.jobPostingMapper.toDto(jobPosting);
      this.created(res, responseData, 'Job posting created successfully');
    } catch (error) {
      this.handleError(res, error);
    }
  };

  getJobPosting = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      
      const jobPosting = await this.getJobPostingUseCase.execute(id);
      
      this.incrementJobViewCountUseCase.execute(id).catch(console.error);

      const responseData = this.jobPostingMapper.toDto(jobPosting);
      this.success(res, responseData, 'Job posting retrieved successfully');
    } catch (error) {
      this.handleError(res, error);
    }
  };

  getCompanyJobPostings = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const companyId = req.user?.id;
      if (!companyId) {
        this.unauthorized(res, 'Company ID not found');
        return;
      }

      const query: JobPostingQueryRequestDto = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
        is_active: req.query.is_active !== undefined ? req.query.is_active === 'true' : undefined,
        category_ids: req.query.category_ids ? (req.query.category_ids as string).split(',') : undefined,
        employment_types: req.query.employment_types ? (req.query.employment_types as string).split(',') as ('full-time' | 'part-time' | 'contract' | 'internship' | 'remote')[] : undefined,
        salary_min: req.query.salary_min ? parseInt(req.query.salary_min as string) : undefined,
        salary_max: req.query.salary_max ? parseInt(req.query.salary_max as string) : undefined,
        location: req.query.location as string,
        search: req.query.search as string,
      };

      const result = await this.getCompanyJobPostingsUseCase.execute(companyId, query);
      
      this.success(res, result, 'Company job postings retrieved successfully');
    } catch (error) {
      this.handleError(res, error);
    }
  };


  updateJobPosting = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const companyId = req.user?.id;
      
      if (!companyId) {
        this.unauthorized(res, 'Company ID not found');
        return;
      }

      const updateJobPostingDto: UpdateJobPostingRequestDto = req.body;
      
      const jobPosting = await this.updateJobPostingUseCase.execute(id, companyId, updateJobPostingDto);
      
      this.success(res, jobPosting, 'Job posting updated successfully');
    } catch (error) {
      this.handleError(res, error);
    }
  };

  deleteJobPosting = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const companyId = req.user?.id;
      
      if (!companyId) {
        this.unauthorized(res, 'Company ID not found');
        return;
      }

      await this.deleteJobPostingUseCase.execute(id, companyId);
      
      this.success(res, null, 'Job posting deleted successfully');
    } catch (error) {
      this.handleError(res, error);
    }
  };

  updateJobStatus = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const companyId = req.user?.id;
      const { is_active } = req.body;
      
      if (!companyId) {
        this.unauthorized(res, 'Company ID not found');
        return;
      }

      if (typeof is_active !== 'boolean') {
        this.badRequest(res, 'is_active must be a boolean value');
        return;
      }

      const jobPosting = await this.updateJobStatusUseCase.execute(id, companyId, is_active);
      
      this.success(res, jobPosting, 'Job status updated successfully');
    } catch (error) {
      this.handleError(res, error);
    }
  };
}
