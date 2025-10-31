import { Request, Response } from 'express';
import { IGetAllJobPostingsUseCase } from '../../../domain/interfaces/use-cases/IPublicUseCases';
import { IGetJobPostingForPublicUseCase } from '../../../domain/interfaces/use-cases/IPublicUseCases';
import { handleError } from '../../../shared/utils/controller.utils';
import { success } from '../../../shared/utils/controller.utils';
import { JobPostingQueryRequestDto } from '../../../application/dto/job-posting/job-posting.dto';

export class PublicJobController {
  constructor(
    private readonly _getAllJobPostingsUseCase: IGetAllJobPostingsUseCase,
    private readonly _getJobPostingForPublicUseCase: IGetJobPostingForPublicUseCase,
  ) {}

  getAllJobPostings = async (req: Request, res: Response): Promise<void> => {
    try {
      
      const filters = req.query as unknown as JobPostingQueryRequestDto;
      
      const result = await this._getAllJobPostingsUseCase.execute(filters);

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