import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../../../shared/types';
import { success, created, unauthorized, badRequest, handleError } from '../../../shared/utils';
import { ICreateJobPostingUseCase, IGetJobPostingUseCase, IGetCompanyJobPostingsUseCase, IUpdateJobPostingUseCase, IDeleteJobPostingUseCase, IIncrementJobViewCountUseCase, IUpdateJobStatusUseCase } from '../../../domain/interfaces/use-cases';
import { CreateJobPostingRequestDto, UpdateJobPostingRequestDto, JobPostingQueryRequestDto } from '../../../application/dto/job-posting/job-posting.dto';
import { ICompanyProfileRepository } from '../../../domain/interfaces';

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

      
      const query = req.query as unknown as JobPostingQueryRequestDto;
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
