import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController, AuthenticatedRequest } from '../../../shared/base/base-controller';
import { GetJobPostingUseCase } from '../../../application/use-cases/company';
import { GetAllJobPostingsUseCase } from '../../../application/use-cases/public/get-all-job-postings.use-case';
import { JobPostingQueryRequestDto } from '../../../application/dto/job-posting/job-posting.dto';
import { IncrementJobViewCountUseCase } from '../../../application/use-cases/company';
import { TYPES } from '../../../infrastructure/di/types';

@injectable()
export class SeekerController extends BaseController {
  constructor(
    @inject(TYPES.GetJobPostingUseCase) private getJobPostingUseCase: GetJobPostingUseCase,
    @inject(TYPES.GetAllJobPostingsUseCase) private getAllJobPostingsUseCase: GetAllJobPostingsUseCase,
    @inject(TYPES.IncrementJobViewCountUseCase) private incrementJobViewCountUseCase: IncrementJobViewCountUseCase,
  ) {
    super();
  }

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

      const result = await this.getAllJobPostingsUseCase.execute(query);
      
      this.success(res, result, 'Job postings retrieved successfully');
    } catch (error) {
      this.handleError(res, error);
    }
  };

  getJobPosting = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      
      const jobPosting = await this.getJobPostingUseCase.execute(id);
      
      this.incrementJobViewCountUseCase.execute(id).catch(console.error);
      
      this.success(res, jobPosting, 'Job posting retrieved successfully');
    } catch (error) {
      this.handleError(res, error);
    }
  };
}
