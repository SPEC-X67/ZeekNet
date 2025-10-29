import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../../../shared/types/authenticated-request';
import { success } from '../../../shared/utils/controller.utils';
import { handleError } from '../../../shared/utils/controller.utils';
import { IGetJobPostingUseCase } from '../../../domain/interfaces/use-cases/ICompanyUseCases';
import { IGetAllJobPostingsUseCase } from '../../../domain/interfaces/use-cases/IPublicUseCases';
import { IIncrementJobViewCountUseCase } from '../../../domain/interfaces/use-cases/ICompanyUseCases';
import { JobPostingQueryRequestDto } from '../../../application/dto/job-posting/job-posting.dto';

export class SeekerController {
  constructor(
    private readonly _getJobPostingUseCase: IGetJobPostingUseCase,
    private readonly _getAllJobPostingsUseCase: IGetAllJobPostingsUseCase,
    private readonly _incrementJobViewCountUseCase: IIncrementJobViewCountUseCase,
  ) {}

  getAllJobPostings = async (req: Request, res: Response): Promise<void> => {
    try {
      
      const query = req.query as unknown as JobPostingQueryRequestDto;
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
