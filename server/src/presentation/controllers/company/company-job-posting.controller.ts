import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../../../shared/types';
import { handleValidationError, handleAsyncError, sendSuccessResponse, sendNotFoundResponse, badRequest, validateUserId, success, created, unauthorized, handleError } from '../../../shared/utils';
import { ICreateJobPostingUseCase, IGetJobPostingUseCase, IGetCompanyJobPostingsUseCase, IUpdateJobPostingUseCase, IDeleteJobPostingUseCase, IIncrementJobViewCountUseCase, IUpdateJobStatusUseCase } from '../../../domain/interfaces/use-cases';
import { CreateJobPostingRequestDto, UpdateJobPostingRequestDto, JobPostingQueryRequestDto } from '../../../application/dto/job-posting/job-posting.dto';
import { ICompanyProfileRepository } from 'src/domain/interfaces';

export class CompanyJobPostingController {
  constructor(
    private readonly _createJobPostingUseCase: ICreateJobPostingUseCase,
    private readonly _getJobPostingUseCase: IGetJobPostingUseCase,
    private readonly _getCompanyJobPostingsUseCase: IGetCompanyJobPostingsUseCase,
    private readonly _updateJobPostingUseCase: IUpdateJobPostingUseCase,
    private readonly _deleteJobPostingUseCase: IDeleteJobPostingUseCase,
    private readonly _incrementJobViewCountUseCase: IIncrementJobViewCountUseCase,
    private readonly _updateJobStatusUseCase: IUpdateJobStatusUseCase,
    private readonly _companyProfileRepository: ICompanyProfileRepository,
  ) {}

  createJobPosting = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        unauthorized(res, 'User ID not found');
        return;
      }

      const companyProfile = await this._companyProfileRepository.getProfileByUserId(userId);
      if (!companyProfile) {
        badRequest(res, 'Company profile not found');
        return;
      }

      const createJobPostingDto: CreateJobPostingRequestDto = req.body;
      const jobPosting = await this._createJobPostingUseCase.execute(companyProfile.id, createJobPostingDto);
      created(res, jobPosting, 'Job posting created successfully');
    } catch (error) {
      handleError(res, error);
    }
  };

  getJobPosting = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userRole = req.user?.role || '';

      const jobPosting = await this._getJobPostingUseCase.execute(id);

      this._incrementJobViewCountUseCase.execute(id, userRole).catch(console.error);

      success(res, jobPosting, 'Job posting retrieved successfully');
    } catch (error) {
      handleError(res, error);
    }
  };

  getCompanyJobPostings = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const companyId = req.user?.id;

      if (!companyId || companyId === 'undefined') {
        unauthorized(res, 'Company ID not found - user may not be authenticated');
        return;
      }

      const query: JobPostingQueryRequestDto = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
        is_active: req.query.is_active !== undefined ? req.query.is_active === 'true' : undefined,
        category_ids: req.query.category_ids ? (req.query.category_ids as string).split(',') : undefined,
        employment_types: req.query.employment_types ? ((req.query.employment_types as string).split(',') as ('full-time' | 'part-time' | 'contract' | 'internship' | 'remote')[]) : undefined,
        salary_min: req.query.salary_min ? parseInt(req.query.salary_min as string) : undefined,
        salary_max: req.query.salary_max ? parseInt(req.query.salary_max as string) : undefined,
        location: req.query.location as string,
        search: req.query.search as string,
      };

      const result = await this._getCompanyJobPostingsUseCase.execute(companyId!, query);

      const responseData = {
        jobs: result.jobs,
        pagination: result.pagination,
      };

      success(res, responseData, 'Company job postings retrieved successfully');
    } catch (error) {
      handleError(res, error);
    }
  };

  updateJobPosting = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const companyId = req.user?.id;

      if (!companyId) {
        unauthorized(res, 'Company ID not found');
        return;
      }

      const updateJobPostingDto: UpdateJobPostingRequestDto = req.body;

      const jobPosting = await this._updateJobPostingUseCase.execute(id, updateJobPostingDto);

      success(res, jobPosting, 'Job posting updated successfully');
    } catch (error) {
      handleError(res, error);
    }
  };

  deleteJobPosting = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const companyId = req.user?.id;

      if (!companyId) {
        unauthorized(res, 'Company ID not found');
        return;
      }

      await this._deleteJobPostingUseCase.execute(id, companyId);

      success(res, null, 'Job posting deleted successfully');
    } catch (error) {
      handleError(res, error);
    }
  };

  updateJobStatus = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const companyId = req.user?.id;
      const { is_active } = req.body;

      if (!companyId) {
        unauthorized(res, 'Company ID not found');
        return;
      }

      if (typeof is_active !== 'boolean') {
        badRequest(res, 'is_active must be a boolean value');
        return;
      }

      const jobPosting = await this._updateJobStatusUseCase.execute(id, is_active);

      success(res, jobPosting, 'Job status updated successfully');
    } catch (error) {
      handleError(res, error);
    }
  };
}
