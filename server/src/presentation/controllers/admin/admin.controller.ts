import { Request, Response, NextFunction } from 'express';
import {
  GetAllUsersDto,
  BlockUserDto,
  GetAllCompaniesDto,
  CompanyVerificationDto,
} from '../../../application/dto/admin';
import {
  GetAllUsersUseCase,
  BlockUserUseCase,
  AdminGetUserByIdUseCase,
  GetAllCompaniesUseCase,
  GetCompaniesWithVerificationUseCase,
  VerifyCompanyUseCase,
} from '../../../application/use-cases';
import { BlockCompanyUseCase } from '../../../application/use-cases/admin/block-company.use-case';
import { BaseController } from '../../../shared';

export class AdminController extends BaseController {
  constructor(
    private readonly _getAllUsersUseCase: GetAllUsersUseCase,
    private readonly _blockUserUseCase: BlockUserUseCase,
    private readonly _getUserByIdUseCase: AdminGetUserByIdUseCase,
    private readonly _getAllCompaniesUseCase: GetAllCompaniesUseCase,
    private readonly _getCompaniesWithVerificationUseCase: GetCompaniesWithVerificationUseCase,
    private readonly _verifyCompanyUseCase: VerifyCompanyUseCase,
    private readonly _blockCompanyUseCase: BlockCompanyUseCase,
  ) {
    super();
  }

  getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const parsed = GetAllUsersDto.safeParse(req.query);
    if (!parsed.success) {
      return this.handleValidationError('Invalid query parameters', next);
    }

    try {
      const result = await this._getAllUsersUseCase.execute(parsed.data);
      this.sendSuccessResponse(res, 'Users retrieved successfully', result);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  blockUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const parsed = BlockUserDto.safeParse(req.body);
    if (!parsed.success) {
      return this.handleValidationError('Invalid block user data', next);
    }

    try {
      await this._blockUserUseCase.execute(
        parsed.data.userId,
        parsed.data.isBlocked,
      );
      const message = `User ${parsed.data.isBlocked ? 'blocked' : 'unblocked'} successfully`;
      this.sendSuccessResponse(res, message, null);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { userId } = req.params;
    if (!userId) {
      return this.handleValidationError('User ID is required', next);
    }

    try {
      const user = await this._getUserByIdUseCase.execute(userId);
      this.sendSuccessResponse(res, 'User retrieved successfully', user);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  getAllCompanies = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const parsed = GetAllCompaniesDto.safeParse(req.query);
    if (!parsed.success) {
      return this.handleValidationError('Invalid query parameters', next);
    }

    try {
      const result = await this._getCompaniesWithVerificationUseCase.execute(parsed.data);
      this.sendSuccessResponse(res, 'Companies retrieved successfully', result);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  getPendingCompanies = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this._getCompaniesWithVerificationUseCase.executeForPending();
      this.sendSuccessResponse(res, 'Pending companies retrieved successfully', result);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  getCompanyById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { companyId } = req.params;
    if (!companyId) {
      return this.handleValidationError('Company ID is required', next);
    }

    try {
      const company = await this._getCompaniesWithVerificationUseCase.executeById(companyId);
      if (!company) {
        return this.sendNotFoundResponse(res, 'Company not found');
      }
      
      this.sendSuccessResponse(res, 'Company retrieved successfully', company);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  verifyCompany = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const parsed = CompanyVerificationDto.safeParse(req.body);
    if (!parsed.success) {
      return this.handleValidationError('Invalid verification data', next);
    }

    try {
      await this._verifyCompanyUseCase.execute(
        parsed.data.companyId,
        parsed.data.isVerified,
      );

      const message = `Company ${parsed.data.isVerified} successfully`;
      this.sendSuccessResponse(res, message, null);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };

  blockCompany = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { companyId, isBlocked } = req.body;
    
    if (!companyId || typeof isBlocked !== 'boolean') {
      return this.handleValidationError('Company ID and isBlocked status are required', next);
    }

    try {
      await this._blockCompanyUseCase.execute(companyId, isBlocked);
      const message = `Company ${isBlocked ? 'blocked' : 'unblocked'} successfully`;
      this.sendSuccessResponse(res, message, null);
    } catch (error) {
      this.handleAsyncError(error, next);
    }
  };
}
