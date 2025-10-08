import { Request, Response, NextFunction } from 'express';
import {
  AdminGetAllJobsDto,
  AdminUpdateJobStatusDto,
} from '../../../application/dto/admin/admin-job.dto';
import { AdminGetAllJobsUseCase } from '../../../application/use-cases/admin/get-all-jobs.use-case';
import { AdminGetJobByIdUseCase } from '../../../application/use-cases/admin/get-job-by-id.use-case';
import { AdminUpdateJobStatusUseCase } from '../../../application/use-cases/admin/update-job-status.use-case';
import { AdminDeleteJobUseCase } from '../../../application/use-cases/admin/delete-job.use-case';
import { AdminGetJobStatsUseCase } from '../../../application/use-cases/admin/get-job-stats.use-case';
import { handleValidationError, handleAsyncError, sendSuccessResponse } from '../../../shared/utils';

export class AdminJobController {
  constructor(
    private readonly _getAllJobsUseCase: AdminGetAllJobsUseCase,
    private readonly _getJobByIdUseCase: AdminGetJobByIdUseCase,
    private readonly _updateJobStatusUseCase: AdminUpdateJobStatusUseCase,
    private readonly _deleteJobUseCase: AdminDeleteJobUseCase,
    private readonly _getJobStatsUseCase: AdminGetJobStatsUseCase,
  ) {  }

  getAllJobs = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const parsed = AdminGetAllJobsDto.safeParse(req.query);
    if (!parsed.success) {
      return handleValidationError('Invalid query parameters', next);
    }

    try {
      const result = await this._getAllJobsUseCase.execute(parsed.data);
      sendSuccessResponse(res, 'Jobs retrieved successfully', result);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  getJobById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { id } = req.params;
    if (!id) {
      return handleValidationError('Job ID is required', next);
    }

    try {
      const job = await this._getJobByIdUseCase.execute(id);
      sendSuccessResponse(res, 'Job retrieved successfully', job);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  updateJobStatus = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { id } = req.params;
    if (!id) {
      return handleValidationError('Job ID is required', next);
    }

    const parsed = AdminUpdateJobStatusDto.safeParse(req.body);
    if (!parsed.success) {
      return handleValidationError('Invalid status data', next);
    }

    try {
      await this._updateJobStatusUseCase.execute(id, parsed.data.is_active);
      const message = `Job ${parsed.data.is_active ? 'activated' : 'deactivated'} successfully`;
      sendSuccessResponse(res, message, null);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  deleteJob = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { id } = req.params;
    if (!id) {
      return handleValidationError('Job ID is required', next);
    }

    try {
      await this._deleteJobUseCase.execute(id);
      sendSuccessResponse(res, 'Job deleted successfully', null);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  getJobStats = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const stats = await this._getJobStatsUseCase.execute();
      sendSuccessResponse(res, 'Job statistics retrieved successfully', stats);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };
}
