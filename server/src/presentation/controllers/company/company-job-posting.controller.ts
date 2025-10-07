import { Request, Response } from 'express';
import { BaseController, AuthenticatedRequest } from '../../../shared/base/base-controller';
import { CreateJobPostingUseCase, GetJobPostingUseCase, GetCompanyJobPostingsUseCase, UpdateJobPostingUseCase, DeleteJobPostingUseCase, IncrementJobViewCountUseCase, UpdateJobStatusUseCase } from '../../../application/use-cases/company';
import { CreateJobPostingRequestDto, UpdateJobPostingRequestDto, JobPostingQueryRequestDto } from '../../../application/dto/job-posting/job-posting.dto';

export class CompanyJobPostingController extends BaseController {
  constructor(
    private readonly _createJobPostingUseCase: CreateJobPostingUseCase,
    private readonly _getJobPostingUseCase: GetJobPostingUseCase,
    private readonly _getCompanyJobPostingsUseCase: GetCompanyJobPostingsUseCase,
    private readonly _updateJobPostingUseCase: UpdateJobPostingUseCase,
    private readonly _deleteJobPostingUseCase: DeleteJobPostingUseCase,
    private readonly _incrementJobViewCountUseCase: IncrementJobViewCountUseCase,
    private readonly _updateJobStatusUseCase: UpdateJobStatusUseCase,
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
      const jobPosting = await this._createJobPostingUseCase.execute(companyId, createJobPostingDto);
      this.created(res, jobPosting, 'Job posting created successfully');
    } catch (error) {
      this.handleError(res, error);
    }
  };

  getJobPosting = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userRole = req.user?.role;
      
      const jobPosting = await this._getJobPostingUseCase.execute(id);
      
      this._incrementJobViewCountUseCase.execute(id, userRole).catch(console.error);

      this.success(res, jobPosting, 'Job posting retrieved successfully');
    } catch (error) {
      this.handleError(res, error);
    }
  };

  getCompanyJobPostings = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const companyId = req.user?.id;
      
      if (!companyId || companyId === 'undefined') {
        this.unauthorized(res, 'Company ID not found - user may not be authenticated');
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

      const result = await this._getCompanyJobPostingsUseCase.execute(companyId, query);
      
      const responseData = {
        jobs: result.jobs,
        pagination: result.pagination
      };
      
      this.success(res, responseData, 'Company job postings retrieved successfully');
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
      
      const jobPosting = await this._updateJobPostingUseCase.execute(id, companyId, updateJobPostingDto);
      
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

      await this._deleteJobPostingUseCase.execute(id, companyId);
      
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

      const jobPosting = await this._updateJobStatusUseCase.execute(id, companyId, is_active);
      
      this.success(res, jobPosting, 'Job status updated successfully');
    } catch (error) {
      this.handleError(res, error);
    }
  };
}
