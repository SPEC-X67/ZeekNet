import { Request, Response, NextFunction } from 'express';
import { IS3Service } from '../../../domain/interfaces';
import {
  CreateCompanyProfileDto,
  SimpleCompanyProfileDto,
  SimpleUpdateCompanyProfileDto,
  UpdateCompanyContactDto,
  CreateCompanyTechStackDto,
  UpdateCompanyTechStackDto,
  CreateCompanyOfficeLocationDto,
  UpdateCompanyOfficeLocationDto,
  CreateCompanyBenefitsDto,
  UpdateCompanyBenefitsDto,
  CreateCompanyWorkplacePicturesDto,
  UpdateCompanyWorkplacePicturesDto,
  DeleteImageDto,
  UploadWorkplacePictureDto,
} from '../../../application/dto/company';
import {
  ICreateCompanyProfileUseCase,
  IUpdateCompanyProfileUseCase,
  IGetCompanyProfileUseCase,
  IReapplyCompanyVerificationUseCase,
  ICompanyContactUseCase,
  IGetCompanyJobPostingsUseCase,
  
  ICreateCompanyTechStackUseCase,
  IUpdateCompanyTechStackUseCase,
  IDeleteCompanyTechStackUseCase,
  IGetCompanyTechStackUseCase,
  
  ICreateCompanyOfficeLocationUseCase,
  IUpdateCompanyOfficeLocationUseCase,
  IDeleteCompanyOfficeLocationUseCase,
  IGetCompanyOfficeLocationUseCase,
  
  ICreateCompanyBenefitUseCase,
  IUpdateCompanyBenefitUseCase,
  IDeleteCompanyBenefitUseCase,
  IGetCompanyBenefitUseCase,
  
  ICreateCompanyWorkplacePictureUseCase,
  IUpdateCompanyWorkplacePictureUseCase,
  IDeleteCompanyWorkplacePictureUseCase,
  IGetCompanyWorkplacePictureUseCase,
} from '../../../domain/interfaces/use-cases';
import { AuthenticatedRequest } from '../../../shared/types';
import { handleValidationError, handleAsyncError, sendSuccessResponse, sendNotFoundResponse, sendErrorResponse, badRequest, validateUserId } from '../../../shared/utils';
import { UploadService } from '../../../shared/services/upload.service';
import { CompanyProfileMapper } from '../../../application/mappers';

export class CompanyController {
  constructor(
    private readonly _createCompanyProfileUseCase: ICreateCompanyProfileUseCase,
    private readonly _reapplyCompanyVerificationUseCase: IReapplyCompanyVerificationUseCase,
    private readonly _updateCompanyProfileUseCase: IUpdateCompanyProfileUseCase,
    private readonly _getCompanyProfileUseCase: IGetCompanyProfileUseCase,
    private readonly _s3Service: IS3Service,
    private readonly _companyContactUseCase: ICompanyContactUseCase,
    
    private readonly _createCompanyTechStackUseCase: ICreateCompanyTechStackUseCase,
    private readonly _updateCompanyTechStackUseCase: IUpdateCompanyTechStackUseCase,
    private readonly _deleteCompanyTechStackUseCase: IDeleteCompanyTechStackUseCase,
    private readonly _getCompanyTechStackUseCase: IGetCompanyTechStackUseCase,
    
    private readonly _createCompanyOfficeLocationUseCase: ICreateCompanyOfficeLocationUseCase,
    private readonly _updateCompanyOfficeLocationUseCase: IUpdateCompanyOfficeLocationUseCase,
    private readonly _deleteCompanyOfficeLocationUseCase: IDeleteCompanyOfficeLocationUseCase,
    private readonly _getCompanyOfficeLocationUseCase: IGetCompanyOfficeLocationUseCase,
    
    private readonly _createCompanyBenefitUseCase: ICreateCompanyBenefitUseCase,
    private readonly _updateCompanyBenefitUseCase: IUpdateCompanyBenefitUseCase,
    private readonly _deleteCompanyBenefitUseCase: IDeleteCompanyBenefitUseCase,
    private readonly _getCompanyBenefitUseCase: IGetCompanyBenefitUseCase,
    
    private readonly _createCompanyWorkplacePictureUseCase: ICreateCompanyWorkplacePictureUseCase,
    private readonly _updateCompanyWorkplacePictureUseCase: IUpdateCompanyWorkplacePictureUseCase,
    private readonly _deleteCompanyWorkplacePictureUseCase: IDeleteCompanyWorkplacePictureUseCase,
    private readonly _getCompanyWorkplacePictureUseCase: IGetCompanyWorkplacePictureUseCase,
    private readonly _getCompanyJobPostingsUseCase: IGetCompanyJobPostingsUseCase,
  ) {}

  createCompanyProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const parsed = SimpleCompanyProfileDto.safeParse(req.body);
    if (!parsed.success) {
      console.error('Company profile validation failed:', {
        body: req.body,
        errors: parsed.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
          code: err.code,
        })),
      });
      return handleValidationError(`Invalid profile data: ${parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`, next);
    }

    try {
      const userId = validateUserId(req);
      const profileData = {
        companyName: parsed.data.company_name,
        logo: parsed.data.logo || '/default-logo.png',
        banner: '/default-banner.png',
        websiteLink: parsed.data.website || '',
        employeeCount: parseInt(parsed.data.employees),
        industry: parsed.data.industry,
        organisation: parsed.data.organisation,
        aboutUs: parsed.data.description,
        taxId: parsed.data.tax_id,
        businessLicenseUrl: parsed.data.business_license,
        email: parsed.data.email,
        location: parsed.data.location,
      };
      const profile = await this._createCompanyProfileUseCase.execute(userId, profileData);

      sendSuccessResponse(res, 'Company profile created successfully', profile, undefined, 201);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  updateCompanyProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const parsed = SimpleUpdateCompanyProfileDto.safeParse(req.body);
    if (!parsed.success) {
      console.error('Company profile update validation failed:', {
        body: req.body,
        errors: parsed.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
          code: err.code,
        })),
      });
      return handleValidationError(`Invalid company profile data: ${parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`, next);
    }

    try {
      const userId = validateUserId(req);
      const updateData = {
        profile: parsed.data,
      };
      const companyProfile = await this._updateCompanyProfileUseCase.execute(userId, updateData);

      sendSuccessResponse(res, 'Company profile updated successfully', companyProfile, undefined, 200);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  getCompanyProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = validateUserId(req);
      const companyProfile = await this._getCompanyProfileUseCase.execute(userId);

      if (!companyProfile) {
        return sendNotFoundResponse(res, 'Company profile not found');
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

      const jobPostings = await this._getCompanyJobPostingsUseCase.execute(userId, jobPostingsQuery);

      const responseData = CompanyProfileMapper.toDetailedDto({
        ...companyProfile,
        jobPostings: jobPostings.jobs,
      });
      sendSuccessResponse(res, 'Company profile retrieved successfully', responseData);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  getCompanyProfileById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { profileId } = req.params;
      if (!profileId) {
        return handleValidationError('Profile ID is required', next);
      }
      sendNotFoundResponse(res, 'Method not implemented');
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  getCompanyDashboard = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = validateUserId(req);
      const companyProfile = await this._getCompanyProfileUseCase.execute(userId);

      const dashboardData = {
        hasProfile: !!companyProfile,
        profile: companyProfile,
        profileStatus: companyProfile?.profile.isVerified || 'not_created',
      };

      sendSuccessResponse(res, 'Company dashboard data retrieved successfully', dashboardData);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  reapplyVerification = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = validateUserId(req);

      const parsed = SimpleCompanyProfileDto.safeParse(req.body);
      if (!parsed.success) {
        return handleValidationError('Invalid profile data', next);
      }

      const verificationData = {
        taxId: parsed.data.tax_id,
        businessLicenseUrl: parsed.data.business_license,
      };
      const updatedProfile = await this._reapplyCompanyVerificationUseCase.execute(userId, verificationData);

      sendSuccessResponse(res, 'Verification reapplication submitted successfully. Your application is now under review.', updatedProfile);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  uploadLogo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await UploadService.handleFileUpload(req, this._s3Service, 'logo');
      sendSuccessResponse(res, 'Logo uploaded successfully', result);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  uploadBusinessLicense = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await UploadService.handleFileUpload(req, this._s3Service, 'business_license');
      sendSuccessResponse(res, 'Business license uploaded successfully', result);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  deleteImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const parsed = DeleteImageDto.safeParse(req.body);
    if (!parsed.success) {
      return handleValidationError(`Invalid image deletion data: ${parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`, next);
    }

    try {
      await UploadService.handleFileDeletion(parsed.data.imageUrl, this._s3Service);
      sendSuccessResponse(res, 'Image deleted successfully', null);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  getCompanyContact = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = validateUserId(req);
      const companyProfile = await this._getCompanyProfileUseCase.execute(userId);
      if (!companyProfile) {
        return sendNotFoundResponse(res, 'Company profile not found');
      }

      const contact = await this._companyContactUseCase.getContactsByCompanyId(companyProfile.profile.id);
      sendSuccessResponse(res, 'Company contact retrieved successfully', contact);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  updateCompanyContact = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = validateUserId(req);
      const companyProfile = await this._getCompanyProfileUseCase.execute(userId);
      if (!companyProfile) {
        return sendNotFoundResponse(res, 'Company profile not found');
      }

      const parsed = UpdateCompanyContactDto.safeParse(req.body);
      if (!parsed.success) {
        return handleValidationError(`Invalid contact data: ${parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`, next);
      }

      const existingContacts = await this._companyContactUseCase.getContactsByCompanyId(companyProfile.profile.id);

      if (existingContacts.length > 0) {
        const contact = await this._companyContactUseCase.updateContact(existingContacts[0].id, parsed.data);
        sendSuccessResponse(res, 'Company contact updated successfully', contact);
      } else {
        const contact = await this._companyContactUseCase.createContact(companyProfile.profile.id, parsed.data);
        sendSuccessResponse(res, 'Company contact created successfully', contact);
      }
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  getCompanyTechStacks = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = validateUserId(req);
      const companyProfile = await this._getCompanyProfileUseCase.execute(userId);
      if (!companyProfile) {
        return sendNotFoundResponse(res, 'Company profile not found');
      }

      const techStacks = await this._getCompanyTechStackUseCase.executeByCompanyId(companyProfile.profile.id);
      sendSuccessResponse(res, 'Company tech stacks retrieved successfully', techStacks);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  createCompanyTechStack = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const parsed = CreateCompanyTechStackDto.safeParse(req.body);
    if (!parsed.success) {
      return handleValidationError(`Invalid tech stack data: ${parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`, next);
    }

    try {
      const userId = validateUserId(req);
      const companyProfile = await this._getCompanyProfileUseCase.execute(userId);
      if (!companyProfile) {
        return sendNotFoundResponse(res, 'Company profile not found');
      }

      const techStack = await this._createCompanyTechStackUseCase.execute(companyProfile.profile.id, parsed.data);
      sendSuccessResponse(res, 'Tech stack created successfully', techStack, undefined, 201);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  updateCompanyTechStack = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const parsed = UpdateCompanyTechStackDto.safeParse(req.body);
    if (!parsed.success) {
      return handleValidationError(`Invalid tech stack data: ${parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`, next);
    }

    try {
      const userId = validateUserId(req);
      const companyProfile = await this._getCompanyProfileUseCase.execute(userId);
      if (!companyProfile) {
        return sendNotFoundResponse(res, 'Company profile not found');
      }

      const { id } = req.params;

      const existingTechStack = await this._getCompanyTechStackUseCase.executeById(id);
      if (!existingTechStack || existingTechStack.companyId !== companyProfile.profile.id) {
        return sendNotFoundResponse(res, 'Tech stack not found');
      }

      const techStack = await this._updateCompanyTechStackUseCase.execute(id, parsed.data as any);
      sendSuccessResponse(res, 'Tech stack updated successfully', techStack);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  deleteCompanyTechStack = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = validateUserId(req);
      const companyProfile = await this._getCompanyProfileUseCase.execute(userId);
      if (!companyProfile) {
        return sendNotFoundResponse(res, 'Company profile not found');
      }

      const { id } = req.params;

      const existingTechStack = await this._getCompanyTechStackUseCase.executeById(id);
      if (!existingTechStack || existingTechStack.companyId !== companyProfile.profile.id) {
        return sendNotFoundResponse(res, 'Tech stack not found');
      }

      await this._deleteCompanyTechStackUseCase.execute(id);
      sendSuccessResponse(res, 'Tech stack deleted successfully', null);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  getCompanyOfficeLocations = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = validateUserId(req);
      const companyProfile = await this._getCompanyProfileUseCase.execute(userId);
      if (!companyProfile) {
        return sendNotFoundResponse(res, 'Company profile not found');
      }

      const locations = await this._getCompanyOfficeLocationUseCase.executeByCompanyId(companyProfile.profile.id);
      sendSuccessResponse(res, 'Company office locations retrieved successfully', locations);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  createCompanyOfficeLocation = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const parsed = CreateCompanyOfficeLocationDto.safeParse(req.body);
    if (!parsed.success) {
      return handleValidationError(`Invalid office location data: ${parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`, next);
    }

    try {
      const userId = validateUserId(req);
      const companyProfile = await this._getCompanyProfileUseCase.execute(userId);
      if (!companyProfile) {
        return sendNotFoundResponse(res, 'Company profile not found');
      }

      const location = await this._createCompanyOfficeLocationUseCase.execute(companyProfile.profile.id, parsed.data);
      sendSuccessResponse(res, 'Office location created successfully', location, undefined, 201);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  updateCompanyOfficeLocation = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const parsed = UpdateCompanyOfficeLocationDto.safeParse(req.body);
    if (!parsed.success) {
      return handleValidationError(`Invalid office location data: ${parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`, next);
    }

    try {
      const userId = validateUserId(req);
      const companyProfile = await this._getCompanyProfileUseCase.execute(userId);
      if (!companyProfile) {
        return sendNotFoundResponse(res, 'Company profile not found');
      }

      const { id } = req.params;

      const existingLocation = await this._getCompanyOfficeLocationUseCase.executeById(id);
      if (!existingLocation || existingLocation.companyId !== companyProfile.profile.id) {
        return sendNotFoundResponse(res, 'Office location not found');
      }

      const location = await this._updateCompanyOfficeLocationUseCase.execute(id, parsed.data as any);
      sendSuccessResponse(res, 'Office location updated successfully', location);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  deleteCompanyOfficeLocation = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = validateUserId(req);
      const companyProfile = await this._getCompanyProfileUseCase.execute(userId);
      if (!companyProfile) {
        return sendNotFoundResponse(res, 'Company profile not found');
      }

      const { id } = req.params;

      const existingLocation = await this._getCompanyOfficeLocationUseCase.executeById(id);
      if (!existingLocation || existingLocation.companyId !== companyProfile.profile.id) {
        return sendNotFoundResponse(res, 'Office location not found');
      }

      await this._deleteCompanyOfficeLocationUseCase.execute(id);
      sendSuccessResponse(res, 'Office location deleted successfully', null);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  getCompanyBenefits = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = validateUserId(req);
      const companyProfile = await this._getCompanyProfileUseCase.execute(userId);
      if (!companyProfile) {
        return sendNotFoundResponse(res, 'Company profile not found');
      }

      const benefits = await this._getCompanyBenefitUseCase.executeByCompanyId(companyProfile.profile.id);
      sendSuccessResponse(res, 'Company benefits retrieved successfully', benefits);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  createCompanyBenefit = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const parsed = CreateCompanyBenefitsDto.safeParse(req.body);
    if (!parsed.success) {
      return handleValidationError(`Invalid benefit data: ${parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`, next);
    }

    try {
      const userId = validateUserId(req);
      const companyProfile = await this._getCompanyProfileUseCase.execute(userId);
      if (!companyProfile) {
        return sendNotFoundResponse(res, 'Company profile not found');
      }

      const benefit = await this._createCompanyBenefitUseCase.execute(companyProfile.profile.id, parsed.data);
      sendSuccessResponse(res, 'Benefit created successfully', benefit, undefined, 201);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  updateCompanyBenefit = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const parsed = UpdateCompanyBenefitsDto.safeParse(req.body);
    if (!parsed.success) {
      return handleValidationError(`Invalid benefit data: ${parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`, next);
    }

    try {
      const userId = validateUserId(req);
      const companyProfile = await this._getCompanyProfileUseCase.execute(userId);
      if (!companyProfile) {
        return sendNotFoundResponse(res, 'Company profile not found');
      }

      const { id } = req.params;

      const existingBenefit = await this._getCompanyBenefitUseCase.executeById(id);
      if (!existingBenefit || existingBenefit.companyId !== companyProfile.profile.id) {
        return sendNotFoundResponse(res, 'Benefit not found');
      }

      const benefit = await this._updateCompanyBenefitUseCase.execute(id, parsed.data as any);
      sendSuccessResponse(res, 'Benefit updated successfully', benefit);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  deleteCompanyBenefit = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = validateUserId(req);
      const companyProfile = await this._getCompanyProfileUseCase.execute(userId);
      if (!companyProfile) {
        return sendNotFoundResponse(res, 'Company profile not found');
      }

      const { id } = req.params;

      const existingBenefit = await this._getCompanyBenefitUseCase.executeById(id);
      if (!existingBenefit || existingBenefit.companyId !== companyProfile.profile.id) {
        return sendNotFoundResponse(res, 'Benefit not found');
      }

      await this._deleteCompanyBenefitUseCase.execute(id);
      sendSuccessResponse(res, 'Benefit deleted successfully', null);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  getCompanyWorkplacePictures = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = validateUserId(req);
      const companyProfile = await this._getCompanyProfileUseCase.execute(userId);
      if (!companyProfile) {
        return sendNotFoundResponse(res, 'Company profile not found');
      }

      const pictures = await this._getCompanyWorkplacePictureUseCase.executeByCompanyId(companyProfile.profile.id);
      sendSuccessResponse(res, 'Company workplace pictures retrieved successfully', pictures);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  createCompanyWorkplacePicture = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const parsed = CreateCompanyWorkplacePicturesDto.safeParse(req.body);
    if (!parsed.success) {
      return handleValidationError(`Invalid workplace picture data: ${parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`, next);
    }

    try {
      const userId = validateUserId(req);
      const companyProfile = await this._getCompanyProfileUseCase.execute(userId);
      if (!companyProfile) {
        return sendNotFoundResponse(res, 'Company profile not found');
      }

      const picture = await this._createCompanyWorkplacePictureUseCase.execute(companyProfile.profile.id, parsed.data);
      sendSuccessResponse(res, 'Workplace picture created successfully', picture, undefined, 201);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  updateCompanyWorkplacePicture = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const parsed = UpdateCompanyWorkplacePicturesDto.safeParse(req.body);
    if (!parsed.success) {
      return handleValidationError(`Invalid workplace picture data: ${parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`, next);
    }

    try {
      const userId = validateUserId(req);
      const companyProfile = await this._getCompanyProfileUseCase.execute(userId);
      if (!companyProfile) {
        return sendNotFoundResponse(res, 'Company profile not found');
      }

      const { id } = req.params;

      const existingPicture = await this._getCompanyWorkplacePictureUseCase.executeById(id);
      if (!existingPicture || existingPicture.companyId !== companyProfile.profile.id) {
        return sendNotFoundResponse(res, 'Workplace picture not found');
      }

      const picture = await this._updateCompanyWorkplacePictureUseCase.execute(id, parsed.data as any);
      sendSuccessResponse(res, 'Workplace picture updated successfully', picture);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  deleteCompanyWorkplacePicture = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = validateUserId(req);
      const companyProfile = await this._getCompanyProfileUseCase.execute(userId);
      if (!companyProfile) {
        return sendNotFoundResponse(res, 'Company profile not found');
      }

      const { id } = req.params;

      const picture = await this._getCompanyWorkplacePictureUseCase.executeById(id);
      if (!picture || picture.companyId !== companyProfile.profile.id) {
        return sendNotFoundResponse(res, 'Workplace picture not found');
      }

      await this._deleteCompanyWorkplacePictureUseCase.execute(id);
      sendSuccessResponse(res, 'Workplace picture deleted successfully', null);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  uploadWorkplacePicture = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.file) {
        return badRequest(res, 'No image file provided');
      }

      const imageUrl = await this._s3Service.uploadImage(req.file.buffer, req.file.originalname, req.file.mimetype);

      const parsed = UploadWorkplacePictureDto.safeParse({ url: imageUrl });
      if (!parsed.success) {
        return handleValidationError(`Invalid image URL: ${parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`, next);
      }

      sendSuccessResponse(res, 'Image uploaded successfully', { url: imageUrl });
    } catch (error) {
      handleAsyncError(error, next);
    }
  };
}
