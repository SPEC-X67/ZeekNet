import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../../../shared/types';
import { handleValidationError, handleAsyncError, sendSuccessResponse, sendNotFoundResponse, badRequest, validateUserId, success, created, unauthorized, handleError } from '../../../shared/utils';
import {
  IGetJobPostingUseCase,
  IGetAllJobPostingsUseCase,
  IIncrementJobViewCountUseCase,
} from '../../../domain/interfaces/use-cases';
import { JobPostingQueryRequestDto } from '../../../application/dto/job-posting/job-posting.dto';

export class SeekerController {
  constructor(
    private readonly _getJobPostingUseCase: IGetJobPostingUseCase,
    private readonly _getAllJobPostingsUseCase: IGetAllJobPostingsUseCase,
    private readonly _incrementJobViewCountUseCase: IIncrementJobViewCountUseCase,
  ) {  }

  getAllJobPostings = async (req: Request, res: Response): Promise<void> => {
    try {
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

      const result = await this._getAllJobPostingsUseCase.execute(query);
      
      success(res, result, 'Job postings retrieved successfully');
    } catch (error) {
      handleError(res, error);
    }
  };

  getJobPosting = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userRole = req.user?.role;
      
      const jobPosting = await this._getJobPostingUseCase.execute(id);
      
      this._incrementJobViewCountUseCase.execute(id, userRole || '').catch(() => {});
      
      success(res, jobPosting, 'Job posting retrieved successfully');
    } catch (error) {
      handleError(res, error);
    }
  };
}
