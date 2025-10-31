import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../shared/types/authenticated-request';
import { success } from '../../../shared/utils/controller.utils';
import { handleError } from '../../../shared/utils/controller.utils';
import { IGetJobPostingUseCase } from '../../../domain/interfaces/use-cases/ICompanyUseCases';
import { IGetAllJobPostingsUseCase } from '../../../domain/interfaces/use-cases/IPublicUseCases';
import { IIncrementJobViewCountUseCase } from '../../../domain/interfaces/use-cases/ICompanyUseCases';
import { JobPostingQueryRequestDto } from '../../../application/dto/job-posting/job-posting.dto';
import { SeekerProfileController } from './seeker-profile.controller';

export class SeekerController {
  public readonly profileController: SeekerProfileController;

  constructor(
    private readonly _getJobPostingUseCase: IGetJobPostingUseCase,
    private readonly _getAllJobPostingsUseCase: IGetAllJobPostingsUseCase,
    private readonly _incrementJobViewCountUseCase: IIncrementJobViewCountUseCase,
    profileController: SeekerProfileController,
  ) {
    this.profileController = profileController;
  }

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

  // Profile methods - delegate to profile controller
  createSeekerProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    return this.profileController.createSeekerProfile(req, res, next);
  };

  getSeekerProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    return this.profileController.getSeekerProfile(req, res, next);
  };

  updateSeekerProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    return this.profileController.updateSeekerProfile(req, res, next);
  };

  addExperience = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    return this.profileController.addExperience(req, res, next);
  };

  getExperiences = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    return this.profileController.getExperiences(req, res, next);
  };

  updateExperience = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    return this.profileController.updateExperience(req, res, next);
  };

  removeExperience = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    return this.profileController.removeExperience(req, res, next);
  };

  addEducation = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    return this.profileController.addEducation(req, res, next);
  };

  getEducation = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    return this.profileController.getEducation(req, res, next);
  };

  updateEducation = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    return this.profileController.updateEducation(req, res, next);
  };

  removeEducation = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    return this.profileController.removeEducation(req, res, next);
  };

  updateSkills = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    return this.profileController.updateSkills(req, res, next);
  };

  uploadResume = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    return this.profileController.uploadResume(req, res, next);
  };

  removeResume = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    return this.profileController.removeResume(req, res, next);
  };
}
