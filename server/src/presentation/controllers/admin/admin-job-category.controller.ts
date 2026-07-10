import { NextFunction, Request, Response } from 'express';
import { IUseCase } from 'src/domain/interfaces/use-cases/base/IUseCase';
import {
  CreateJobCategoryRequestDto,
  CreateJobCategoryDto,
  GetAllJobCategoriesQueryDto,
  UpdateJobCategoryRequestDto,
  UpdateJobCategoryDto,
  JobCategoryResponseDto,
  PaginatedJobCategoriesResultDto,
} from 'src/application/dtos/admin/attributes/job-categories/job-category.dto';
import { formatZodErrors, handleAsyncError, handleValidationError, sendSuccessResponse } from 'src/shared/utils';
import { SUCCESS } from 'src/shared/constants/messages';
import { injectable, inject } from 'inversify';
import { TYPES } from 'src/shared/constants/types';

@injectable()
export class AdminJobCategoryController {
  constructor(
    @inject(TYPES.CreateJobCategoryUseCase)
    private readonly _createJobCategoryUseCase: IUseCase<CreateJobCategoryRequestDto, JobCategoryResponseDto>,
    @inject(TYPES.GetAllJobCategoriesUseCase)
    private readonly _getAllJobCategoriesUseCase: IUseCase<GetAllJobCategoriesQueryDto, PaginatedJobCategoriesResultDto>,
    @inject(TYPES.GetJobCategoryByIdUseCase)
    private readonly _getJobCategoryByIdUseCase: IUseCase<string, JobCategoryResponseDto>,
    @inject(TYPES.UpdateJobCategoryUseCase)
    private readonly _updateJobCategoryUseCase: IUseCase<{ id: string; dto: UpdateJobCategoryRequestDto }, JobCategoryResponseDto>,
    @inject(TYPES.DeleteJobCategoryUseCase)
    private readonly _deleteJobCategoryUseCase: IUseCase<string, boolean>,
  ) { }

  createJobCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const parsed = CreateJobCategoryDto.safeParse(req.body);
    if (!parsed.success) {
      return handleValidationError(formatZodErrors(parsed.error), next);
    }
    try {
      const category = await this._createJobCategoryUseCase.execute(parsed.data);
      sendSuccessResponse(res, SUCCESS.CREATED('Job category'), category);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  getAllJobCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const parsed = GetAllJobCategoriesQueryDto.safeParse(req.query);
    if (!parsed.success) {
      return handleValidationError(formatZodErrors(parsed.error), next);
    }
    try {
      const result = await this._getAllJobCategoriesUseCase.execute(parsed.data);
      sendSuccessResponse(res, SUCCESS.RETRIEVED('Job categories'), result);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  getJobCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const category = await this._getJobCategoryByIdUseCase.execute(id);
      sendSuccessResponse(res, SUCCESS.RETRIEVED('Job category'), category);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  updateJobCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const parsedBody = UpdateJobCategoryDto.safeParse(req.body);
    if (!parsedBody.success) {
      return handleValidationError(formatZodErrors(parsedBody.error), next);
    }
    try {
      const { id } = req.params;
      const category = await this._updateJobCategoryUseCase.execute({ id, dto: parsedBody.data });
      sendSuccessResponse(res, SUCCESS.UPDATED('Job category'), category);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  deleteJobCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await this._deleteJobCategoryUseCase.execute(id);
      sendSuccessResponse(res, SUCCESS.DELETED('Job category'), null);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };
}