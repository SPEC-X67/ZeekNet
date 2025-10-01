import { injectable, inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { IS3Service } from '../../../application/interfaces';
import { TYPES } from '../../../infrastructure/di/types';
import {
  CreateCompanyProfileDto,
  SimpleCompanyProfileDto,
  SimpleUpdateCompanyProfileDto,
  UpdateCompanyContactDto
} from '../../../application/dto/company';
import {
  CreateCompanyProfileUseCase,
  UpdateCompanyProfileUseCase,
  GetCompanyProfileUseCase,
  ReapplyCompanyVerificationUseCase,
  CompanyContactUseCase,
  CompanyTechStackUseCase,
  CompanyOfficeLocationUseCase,
  CompanyBenefitsUseCase,
  CompanyWorkplacePicturesUseCase,
  CompanyTeamUseCase,
  GetCompanyJobPostingsUseCase
} from '../../../application/use-cases';
import { BaseController, AuthenticatedRequest } from '../../../shared';
import { UploadService } from '../../../shared/services/upload.service';
import { CompanyProfileMapper } from '../../../application/mappers';

@injectable()
export class CompanyController extends BaseController {
  constructor(
    @inject(TYPES.CreateCompanyProfileUseCase)
    private readonly createCompanyProfileUseCase: CreateCompanyProfileUseCase,
    @inject(TYPES.ReapplyCompanyVerificationUseCase)
    private readonly reapplyCompanyVerificationUseCase: ReapplyCompanyVerificationUseCase,
    @inject(TYPES.CompanyProfileMapper)
    private readonly companyProfileMapper: CompanyProfileMapper,
    @inject(TYPES.UpdateCompanyProfileUseCase)
    private readonly updateCompanyProfileUseCase: UpdateCompanyProfileUseCase,
    @inject(TYPES.GetCompanyProfileUseCase)
    private readonly getCompanyProfileUseCase: GetCompanyProfileUseCase,
    @inject(TYPES.S3Service)
    private readonly s3Service: IS3Service,
    @inject(TYPES.CompanyContactUseCase)
    private readonly companyContactUseCase: CompanyContactUseCase,
    @inject(TYPES.CompanyTechStackUseCase)
    private readonly companyTechStackUseCase: CompanyTechStackUseCase,
    @inject(TYPES.CompanyOfficeLocationUseCase)
    private readonly companyOfficeLocationUseCase: CompanyOfficeLocationUseCase,
    @inject(TYPES.CompanyBenefitsUseCase)
    private readonly companyBenefitsUseCase: CompanyBenefitsUseCase,
    @inject(TYPES.CompanyWorkplacePicturesUseCase)
    private readonly companyWorkplacePicturesUseCase: CompanyWorkplacePicturesUseCase,
    @inject(TYPES.CompanyTeamUseCase)
    private readonly companyTeamUseCase: CompanyTeamUseCase,
    @inject(TYPES.GetCompanyJobPostingsUseCase)
    private readonly getCompanyJobPostingsUseCase: GetCompanyJobPostingsUseCase,
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

      this.sendSuccessResponse(res, 'Company profile created successfully', profile, undefined, 201);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  updateCompanyProfile = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const parsed = SimpleUpdateCompanyProfileDto.safeParse(req.body);
    if (!parsed.success) {
      console.error('Company profile update validation failed:', {
        body: req.body,
        errors: parsed.error.errors.map(err => ({
          path: err.path,
          message: err.message,
          code: err.code,
        })),
      });
      return this.handleValidationError(`Invalid company profile data: ${parsed.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`, next);
    }

    try {
      const userId = this.validateUserId(req);
      const updateData = {
        profile: parsed.data
      };
      const companyProfile = await this.updateCompanyProfileUseCase.execute(
        userId,
        updateData,
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

      const jobPostingsQuery = {
        page: 1,
        limit: 3,
        is_active: true,
        category_ids: undefined,
        employment_types: undefined,
        salary_min: undefined,
        salary_max: undefined,
        location: undefined,
        search: undefined,
      };
      
      const jobPostings = await this.getCompanyJobPostingsUseCase.execute(userId, jobPostingsQuery);
      
      const responseData = this.companyProfileMapper.toDetailedDto({
        ...companyProfile,
        jobPostings: jobPostings.jobs
      });
      this.sendSuccessResponse(res, 'Company profile retrieved successfully', responseData);
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

  reapplyVerification = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = this.validateUserId(req);
      
      const parsed = SimpleCompanyProfileDto.safeParse(req.body);
      if (!parsed.success) {
        return this.handleValidationError('Invalid profile data', next);
      }
  
      const updatedProfile = await this.reapplyCompanyVerificationUseCase.execute(
        userId,
        parsed.data
      );
      
      this.sendSuccessResponse(
        res, 
        'Verification reapplication submitted successfully. Your application is now under review.',
        updatedProfile
      );
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

  getCompanyContact = async (
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
      
      const contact = await this.companyContactUseCase.getContactsByCompanyId(companyProfile.profile.id);
      this.sendSuccessResponse(res, 'Company contact retrieved successfully', contact);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  updateCompanyContact = async (
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
      
      const parsed = UpdateCompanyContactDto.safeParse(req.body);
      if (!parsed.success) {
        return this.handleValidationError(`Invalid contact data: ${parsed.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`, next);
      }
      
      const existingContacts = await this.companyContactUseCase.getContactsByCompanyId(companyProfile.profile.id);
      
      if (existingContacts.length > 0) {
        const contact = await this.companyContactUseCase.updateContact(existingContacts[0].id, parsed.data);
        this.sendSuccessResponse(res, 'Company contact updated successfully', contact);
      } else {
        const contact = await this.companyContactUseCase.createContact(companyProfile.profile.id, parsed.data);
        this.sendSuccessResponse(res, 'Company contact created successfully', contact);
      }
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  getCompanyTechStacks = async (
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
      
      const techStacks = await this.companyTechStackUseCase.getTechStackByCompanyId(companyProfile.profile.id);
      this.sendSuccessResponse(res, 'Company tech stacks retrieved successfully', techStacks);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  createCompanyTechStack = async (
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
      
      const techStack = await this.companyTechStackUseCase.createTechStack(companyProfile.profile.id, req.body);
      this.sendSuccessResponse(res, 'Tech stack created successfully', techStack, undefined, 201);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  updateCompanyTechStack = async (
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

      const { id } = req.params;
      
      const existingTechStack = await this.companyTechStackUseCase.getTechStackById(id);
      if (!existingTechStack || existingTechStack.companyId !== companyProfile.profile.id) {
        return this.sendNotFoundResponse(res, 'Tech stack not found');
      }
      
      const techStack = await this.companyTechStackUseCase.updateTechStack(id, req.body);
      this.sendSuccessResponse(res, 'Tech stack updated successfully', techStack);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  deleteCompanyTechStack = async (
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

      const { id } = req.params;
      
      const existingTechStack = await this.companyTechStackUseCase.getTechStackById(id);
      if (!existingTechStack || existingTechStack.companyId !== companyProfile.profile.id) {
        return this.sendNotFoundResponse(res, 'Tech stack not found');
      }
      
      await this.companyTechStackUseCase.deleteTechStack(id);
      this.sendSuccessResponse(res, 'Tech stack deleted successfully', null);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  getCompanyOfficeLocations = async (
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
      
      const locations = await this.companyOfficeLocationUseCase.getOfficeLocationsByCompanyId(companyProfile.profile.id);
      this.sendSuccessResponse(res, 'Company office locations retrieved successfully', locations);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  createCompanyOfficeLocation = async (
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
      
      const location = await this.companyOfficeLocationUseCase.createOfficeLocation(companyProfile.profile.id, req.body);
      this.sendSuccessResponse(res, 'Office location created successfully', location, undefined, 201);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  updateCompanyOfficeLocation = async (
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

      const { id } = req.params;
      
      const existingLocation = await this.companyOfficeLocationUseCase.getOfficeLocationById(id);
      if (!existingLocation || existingLocation.companyId !== companyProfile.profile.id) {
        return this.sendNotFoundResponse(res, 'Office location not found');
      }
      
      const location = await this.companyOfficeLocationUseCase.updateOfficeLocation(id, req.body);
      this.sendSuccessResponse(res, 'Office location updated successfully', location);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  deleteCompanyOfficeLocation = async (
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

      const { id } = req.params;
      
      const existingLocation = await this.companyOfficeLocationUseCase.getOfficeLocationById(id);
      if (!existingLocation || existingLocation.companyId !== companyProfile.profile.id) {
        return this.sendNotFoundResponse(res, 'Office location not found');
      }
      
      await this.companyOfficeLocationUseCase.deleteOfficeLocation(id);
      this.sendSuccessResponse(res, 'Office location deleted successfully', null);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  getCompanyBenefits = async (
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
      
      const benefits = await this.companyBenefitsUseCase.getBenefitsByCompanyId(companyProfile.profile.id);
      this.sendSuccessResponse(res, 'Company benefits retrieved successfully', benefits);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  createCompanyBenefit = async (
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
      
      const benefit = await this.companyBenefitsUseCase.createBenefit(companyProfile.profile.id, req.body);
      this.sendSuccessResponse(res, 'Benefit created successfully', benefit, undefined, 201);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  updateCompanyBenefit = async (
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

      const { id } = req.params;
      
      const existingBenefit = await this.companyBenefitsUseCase.getBenefitById(id);
      if (!existingBenefit || existingBenefit.companyId !== companyProfile.profile.id) {
        return this.sendNotFoundResponse(res, 'Benefit not found');
      }
      
      const benefit = await this.companyBenefitsUseCase.updateBenefit(id, req.body);
      this.sendSuccessResponse(res, 'Benefit updated successfully', benefit);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  deleteCompanyBenefit = async (
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

      const { id } = req.params;
      
      const existingBenefit = await this.companyBenefitsUseCase.getBenefitById(id);
      if (!existingBenefit || existingBenefit.companyId !== companyProfile.profile.id) {
        return this.sendNotFoundResponse(res, 'Benefit not found');
      }
      
      await this.companyBenefitsUseCase.deleteBenefit(id);
      this.sendSuccessResponse(res, 'Benefit deleted successfully', null);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  getCompanyWorkplacePictures = async (
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
      
      const pictures = await this.companyWorkplacePicturesUseCase.getPicturesByCompanyId(companyProfile.profile.id);
      this.sendSuccessResponse(res, 'Company workplace pictures retrieved successfully', pictures);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  createCompanyWorkplacePicture = async (
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
      
      const picture = await this.companyWorkplacePicturesUseCase.createPicture(companyProfile.profile.id, req.body);
      this.sendSuccessResponse(res, 'Workplace picture created successfully', picture, undefined, 201);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  updateCompanyWorkplacePicture = async (
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

      const { id } = req.params;
      
      const existingPicture = await this.companyWorkplacePicturesUseCase.getPictureById(id);
      if (!existingPicture || existingPicture.companyId !== companyProfile.profile.id) {
        return this.sendNotFoundResponse(res, 'Workplace picture not found');
      }
      
      const picture = await this.companyWorkplacePicturesUseCase.updatePicture(id, req.body);
      this.sendSuccessResponse(res, 'Workplace picture updated successfully', picture);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  deleteCompanyWorkplacePicture = async (
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

      const { id } = req.params;
      
      const picture = await this.companyWorkplacePicturesUseCase.getPictureById(id);
      if (!picture || picture.companyId !== companyProfile.profile.id) {
        return this.sendNotFoundResponse(res, 'Workplace picture not found');
      }
      
      await this.companyWorkplacePicturesUseCase.deletePicture(id);
      this.sendSuccessResponse(res, 'Workplace picture deleted successfully', null);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  uploadWorkplacePicture = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!req.file) {
        return this.badRequest(res, 'No image file provided');
      }

      const imageUrl = await this.s3Service.uploadImage(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype,
      );

      this.sendSuccessResponse(res, 'Image uploaded successfully', { url: imageUrl });
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  getCompanyTeam = async (
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
      
      const team = await this.companyTeamUseCase.getTeamMembersByCompanyId(companyProfile.profile.id);
      this.sendSuccessResponse(res, 'Company team retrieved successfully', team);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  createCompanyTeamMember = async (
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
      
      const teamMember = await this.companyTeamUseCase.createTeamMember(companyProfile.profile.id, req.body);
      this.sendSuccessResponse(res, 'Team member created successfully', teamMember, undefined, 201);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  updateCompanyTeamMember = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const teamMember = await this.companyTeamUseCase.updateTeamMember(id, req.body);
      this.sendSuccessResponse(res, 'Team member updated successfully', teamMember);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  deleteCompanyTeamMember = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      await this.companyTeamUseCase.deleteTeamMember(id);
      this.sendSuccessResponse(res, 'Team member deleted successfully', null);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };
}
