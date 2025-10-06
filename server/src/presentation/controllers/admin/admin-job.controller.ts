import { injectable, inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { TYPES } from '../../../infrastructure/di/types';
import {
  AdminGetAllJobsDto,
  AdminUpdateJobStatusDto,
} from '../../../application/dto/admin/admin-job.dto';
import { AdminGetAllJobsUseCase } from '../../../application/use-cases/admin/get-all-jobs.use-case';
import { AdminGetJobByIdUseCase } from '../../../application/use-cases/admin/get-job-by-id.use-case';
import { AdminUpdateJobStatusUseCase } from '../../../application/use-cases/admin/update-job-status.use-case';
import { AdminDeleteJobUseCase } from '../../../application/use-cases/admin/delete-job.use-case';
import { AdminGetJobStatsUseCase } from '../../../application/use-cases/admin/get-job-stats.use-case';
import { BaseController } from '../../../shared';

@injectable()
export class AdminJobController extends BaseController {
  constructor(
    @inject(TYPES.AdminGetAllJobsUseCase)
    private readonly getAllJobsUseCase: AdminGetAllJobsUseCase,
    @inject(TYPES.AdminGetJobByIdUseCase)
    private readonly getJobByIdUseCase: AdminGetJobByIdUseCase,
    @inject(TYPES.AdminUpdateJobStatusUseCase)
    private readonly updateJobStatusUseCase: AdminUpdateJobStatusUseCase,
    @inject(TYPES.AdminDeleteJobUseCase)
    private readonly deleteJobUseCase: AdminDeleteJobUseCase,
    @inject(TYPES.AdminGetJobStatsUseCase)
    private readonly getJobStatsUseCase: AdminGetJobStatsUseCase,
  ) {
    super();
  }

  getAllJobs = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const parsed = AdminGetAllJobsDto.safeParse(req.query);
    if (!parsed.success) {
      return this.handleValidationError('Invalid query parameters', next);
    }

    try {
      const result = await this.getAllJobsUseCase.execute(parsed.data);
      this.sendSuccessResponse(res, 'Jobs retrieved successfully', result);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  getJobById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { jobId } = req.params;
    if (!jobId) {
      return this.handleValidationError('Job ID is required', next);
    }

    try {
      const job = await this.getJobByIdUseCase.execute(jobId);
      this.sendSuccessResponse(res, 'Job retrieved successfully', job);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  updateJobStatus = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { jobId } = req.params;
    if (!jobId) {
      return this.handleValidationError('Job ID is required', next);
    }

    const parsed = AdminUpdateJobStatusDto.safeParse(req.body);
    if (!parsed.success) {
      return this.handleValidationError('Invalid status data', next);
    }

    try {
      await this.updateJobStatusUseCase.execute(jobId, parsed.data.is_active);
      const message = `Job ${parsed.data.is_active ? 'activated' : 'deactivated'} successfully`;
      this.sendSuccessResponse(res, message, null);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  deleteJob = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { jobId } = req.params;
    if (!jobId) {
      return this.handleValidationError('Job ID is required', next);
    }

    try {
      await this.deleteJobUseCase.execute(jobId);
      this.sendSuccessResponse(res, 'Job deleted successfully', null);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  getJobStats = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const stats = await this.getJobStatsUseCase.execute();
      this.sendSuccessResponse(res, 'Job statistics retrieved successfully', stats);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };
}
