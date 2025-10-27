import { Request, Response } from 'express';
import { handleValidationError, handleAsyncError, sendSuccessResponse, success, handleError } from '../../../shared/utils';
import { IGetAllJobPostingsUseCase, IGetJobPostingForPublicUseCase } from '../../../domain/interfaces/use-cases';
import { JobPostingQueryRequestDto } from '../../../application/dto/job-posting/job-posting.dto';

export class PublicJobController {
  constructor(
    private readonly _getAllJobPostingsUseCase: IGetAllJobPostingsUseCase,
    private readonly _getJobPostingForPublicUseCase: IGetJobPostingForPublicUseCase,
  ) {}

  getAllJobPostings = async (req: Request, res: Response): Promise<void> => {
    try {
      const parseQueryArray = (value: unknown): string[] | undefined => {
        if (!value) return undefined;
        if (Array.isArray(value)) return value.map(String);
        if (typeof value === 'string') return value.split(',');
        return undefined;
      };

      const query: JobPostingQueryRequestDto = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
        is_active: true,
        category_ids: parseQueryArray(req.query.category_ids as unknown),
        employment_types: parseQueryArray(req.query.employment_types as unknown) as ('full-time' | 'part-time' | 'contract' | 'internship' | 'remote')[] | undefined,
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

  getJobPosting = async (req: Request, res: Response): Promise<void> => {
    try {
      const jobId = req.params.id;

      const result = await this._getJobPostingForPublicUseCase.execute(jobId);

      success(res, result, 'Job posting retrieved successfully');
    } catch (error) {
      handleError(res, error);
    }
  };
}
