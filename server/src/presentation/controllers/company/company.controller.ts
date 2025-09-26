import { injectable, inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { IS3Service } from '../../../application/interfaces';
import { TYPES } from '../../../infrastructure/di/types';
import {
  CreateCompanyProfileDto,
  SimpleCompanyProfileDto,
  UpdateCompanyProfileDto,
} from '../../../application/dto/company';
import {
  CreateCompanyProfileUseCase,
  UpdateCompanyProfileUseCase,
  GetCompanyProfileUseCase,
} from '../../../application/use-cases';
import { BaseController, AuthenticatedRequest } from '../../../shared';
import { UploadService } from '../../../shared/services/upload.service';

@injectable()
export class CompanyController extends BaseController {
  constructor(
    @inject(TYPES.CreateCompanyProfileUseCase)
    private readonly createCompanyProfileUseCase: CreateCompanyProfileUseCase,
    @inject(TYPES.UpdateCompanyProfileUseCase)
    private readonly updateCompanyProfileUseCase: UpdateCompanyProfileUseCase,
    @inject(TYPES.GetCompanyProfileUseCase)
    private readonly getCompanyProfileUseCase: GetCompanyProfileUseCase,
    @inject(TYPES.S3Service)
    private readonly s3Service: IS3Service,
  ) {
    super();
  }

  createCompanyProfile = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const parsed = SimpleCompanyProfileDto.safeParse(req.body);
    if (!parsed.success) {
      console.error('Company profile validation failed:', {
        body: req.body,
        errors: parsed.error.errors.map(err => ({
          path: err.path,
          message: err.message,
          code: err.code,
        })),
      });
      return this.handleValidationError(`Invalid profile data: ${parsed.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`, next);
    }

    try {
      const userId = this.validateUserId(req);
      const profile = await this.createCompanyProfileUseCase.execute(
        userId,
        parsed.data,
      );

      const responseData = {
        id: profile.id,
        company_name: profile.companyName,
        email: parsed.data.email,
        website: profile.websiteLink,
        industry: profile.industry,
        organisation: profile.organisation,
        location: parsed.data.location,
        employees: parsed.data.employees,
        description: profile.aboutUs,
        logo: profile.logo,
        isVerified: profile.isVerified,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      };

      this.sendSuccessResponse(res, 'Company profile created successfully', responseData, undefined, 201);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  updateCompanyProfile = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const parsed = CreateCompanyProfileDto.safeParse(req.body);
    if (!parsed.success) {
      return this.handleValidationError('Invalid company profile data', next);
    }

    try {
      const userId = this.validateUserId(req);
      const companyProfile = await this.updateCompanyProfileUseCase.execute(
        userId,
        parsed.data,
      );
      
      this.sendSuccessResponse(res, 'Company profile updated successfully', companyProfile, undefined, 200);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };


  getCompanyProfile = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = this.validateUserId(req);
      const companyProfile = await this.getCompanyProfileUseCase.execute(userId);
      
      if (!companyProfile) {
        return this.sendNotFoundResponse(res, 'Company profile not found');
      }

      this.sendSuccessResponse(res, 'Company profile retrieved successfully', companyProfile);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  getCompanyProfileById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { profileId } = req.params;
      if (!profileId) {
        return this.handleValidationError('Profile ID is required', next);
      }
      this.sendNotFoundResponse(res, 'Method not implemented');
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  getCompanyDashboard = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = this.validateUserId(req);
      const companyProfile = await this.getCompanyProfileUseCase.execute(userId);

      const dashboardData = {
        hasProfile: !!companyProfile,
        profile: companyProfile,
        profileStatus: companyProfile?.profile.isVerified || 'not_created',
      };

      this.sendSuccessResponse(res, 'Company dashboard data retrieved successfully', dashboardData);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  uploadLogo = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await UploadService.handleFileUpload(req, this.s3Service, 'logo');
      this.sendSuccessResponse(res, 'Logo uploaded successfully', result);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  uploadBusinessLicense = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await UploadService.handleFileUpload(req, this.s3Service, 'business_license');
      this.sendSuccessResponse(res, 'Business license uploaded successfully', result);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  deleteImage = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { imageUrl } = req.body;
      await UploadService.handleFileDeletion(imageUrl, this.s3Service);
      this.sendSuccessResponse(res, 'Image deleted successfully', null);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };
}
