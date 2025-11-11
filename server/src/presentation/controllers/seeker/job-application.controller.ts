import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../shared/types/authenticated-request';
import {
  handleValidationError,
  handleAsyncError,
  sendSuccessResponse,
  sendNotFoundResponse,
  validateUserId,
  badRequest,
} from '../../../shared/utils/controller.utils';
import {
  ICreateJobApplicationUseCase,
  IGetApplicationsBySeekerUseCase,
  IGetSeekerApplicationDetailsUseCase,
  IDeleteJobApplicationUseCase,
} from '../../../domain/interfaces/use-cases/IJobApplicationUseCases';
import { IS3Service } from '../../../domain/interfaces/services/IS3Service';
import { IJobPostingRepository } from '../../../domain/interfaces/repositories/job/IJobPostingRepository';
import { UploadService } from '../../../shared/services/upload.service';
import { CreateJobApplicationDto } from '../../../application/dto/job-application/create-job-application.dto';
import { ApplicationFiltersDto } from '../../../application/dto/job-application/application-filters.dto';
import { JobApplicationMapper } from '../../../application/mappers/job-application.mapper';
import {
  JobApplicationListResponseDto,
  JobApplicationDetailResponseDto,
  PaginatedApplicationsResponseDto,
} from '../../../application/dto/job-application/job-application-response.dto';

export class SeekerJobApplicationController {
  constructor(
    private readonly _createJobApplicationUseCase: ICreateJobApplicationUseCase,
    private readonly _getApplicationsBySeekerUseCase: IGetApplicationsBySeekerUseCase,
    private readonly _getApplicationDetailsUseCase: IGetSeekerApplicationDetailsUseCase,
    private readonly _s3Service: IS3Service,
    private readonly _jobPostingRepository: IJobPostingRepository,
  ) {}

  createApplication = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = validateUserId(req);

      // Handle resume upload
      if (!req.file) {
        return badRequest(res, 'Resume file is required');
      }

      const resumeUploadResult = await UploadService.handleResumeUpload(req, this._s3Service, 'resume');

      // Get job_id from body
      const { job_id, cover_letter } = req.body;

      if (!job_id) {
        return badRequest(res, 'Job ID is required');
      }

      // Get company_id from job posting
      const job = await this._jobPostingRepository.findById(job_id);
      if (!job) {
        return sendNotFoundResponse(res, 'Job posting not found');
      }

      // Validate DTO
      const dto = CreateJobApplicationDto.safeParse({
        job_id,
        cover_letter,
        resume_url: resumeUploadResult.url,
        resume_filename: resumeUploadResult.filename,
      });

      if (!dto.success) {
        return handleValidationError(
          `Validation error: ${dto.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`,
          next,
        );
      }

      // Create application
      const application = await this._createJobApplicationUseCase.execute(userId, dto.data);

      sendSuccessResponse(res, 'Application submitted successfully', { id: application.id }, undefined, 201);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  getApplications = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = validateUserId(req);

      // Parse query parameters
      const filters = ApplicationFiltersDto.safeParse(req.query);
      if (!filters.success) {
        return handleValidationError(
          `Validation error: ${filters.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`,
          next,
        );
      }

      const result = await this._getApplicationsBySeekerUseCase.execute(userId, {
        stage: filters.data.stage,
        page: filters.data.page,
        limit: filters.data.limit,
      });

      // Enrich with job/company info for user-facing list
      const applications: JobApplicationListResponseDto[] = [];
      for (const app of result.applications) {
        const job = await this._jobPostingRepository.findById(app.job_id);
        applications.push(
          JobApplicationMapper.toListDto(app, {
            jobTitle: job?.title,
            companyName: job?.company_name,
            companyLogo: job?.company_logo,
          }),
        );
      }

      const response: PaginatedApplicationsResponseDto = {
        applications,
        pagination: result.pagination,
      };

      sendSuccessResponse(res, 'Applications retrieved successfully', response);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  getApplicationDetails = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = validateUserId(req);
      const { id } = req.params;

      const application = await this._getApplicationDetailsUseCase.execute(userId, id);

      // Map to response DTO (would need to join with seeker profile and job posting data)
      const response: JobApplicationDetailResponseDto = JobApplicationMapper.toDetailDto(application);

      sendSuccessResponse(res, 'Application details retrieved successfully', response);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };
}

