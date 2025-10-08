import { Request, Response, NextFunction } from 'express';
import {
  GetAllUsersDto,
  BlockUserDto,
  GetAllCompaniesDto,
  CompanyVerificationDto,
} from '../../../application/dto/admin';
import {
  IGetAllUsersUseCase,
  IBlockUserUseCase,
  IAdminGetUserByIdUseCase,
  IGetAllCompaniesUseCase,
  IGetCompaniesWithVerificationUseCase,
  IVerifyCompanyUseCase,
  IBlockCompanyUseCase,
} from '../../../domain/interfaces/use-cases';
import { handleValidationError, handleAsyncError, sendSuccessResponse, sendNotFoundResponse } from '../../../shared/utils';

export class AdminController {
  constructor(
    private readonly _getAllUsersUseCase: IGetAllUsersUseCase,
    private readonly _blockUserUseCase: IBlockUserUseCase,
    private readonly _getUserByIdUseCase: IAdminGetUserByIdUseCase,
    private readonly _getAllCompaniesUseCase: IGetAllCompaniesUseCase,
    private readonly _getCompaniesWithVerificationUseCase: IGetCompaniesWithVerificationUseCase,
    private readonly _verifyCompanyUseCase: IVerifyCompanyUseCase,
    private readonly _blockCompanyUseCase: IBlockCompanyUseCase,
  ) {  }

  getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const parsed = GetAllUsersDto.safeParse(req.query);
    if (!parsed.success) {
      return handleValidationError('Invalid query parameters', next);
    }

    try {
      const options = {
        page: parseInt(parsed.data.page) || 1,
        limit: parseInt(parsed.data.limit) || 10,
        search: parsed.data.search,
        role: parsed.data.role,
        isBlocked: parsed.data.isBlocked ? parsed.data.isBlocked === 'true' : undefined,
      };
      const result = await this._getAllUsersUseCase.execute(options);
      sendSuccessResponse(res, 'Users retrieved successfully', result);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  blockUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const parsed = BlockUserDto.safeParse(req.body);
    if (!parsed.success) {
      return handleValidationError('Invalid block user data', next);
    }

    try {
      await this._blockUserUseCase.execute(
        parsed.data.userId,
        parsed.data.isBlocked,
      );
      const message = `User ${parsed.data.isBlocked ? 'blocked' : 'unblocked'} successfully`;
      sendSuccessResponse(res, message, null);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { userId } = req.params;
    if (!userId) {
      return handleValidationError('User ID is required', next);
    }

    try {
      const user = await this._getUserByIdUseCase.execute(userId);
      sendSuccessResponse(res, 'User retrieved successfully', user);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  getAllCompanies = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const parsed = GetAllCompaniesDto.safeParse(req.query);
    if (!parsed.success) {
      return handleValidationError('Invalid query parameters', next);
    }

    try {
      const options = {
        page: parseInt(parsed.data.page) || 1,
        limit: parseInt(parsed.data.limit) || 10,
        search: parsed.data.search,
        isVerified: parsed.data.isVerified,
        isBlocked: parsed.data.isBlocked ? parsed.data.isBlocked === 'true' : undefined,
      };
      const result = await this._getCompaniesWithVerificationUseCase.execute(options);
      sendSuccessResponse(res, 'Companies retrieved successfully', result);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  getPendingCompanies = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this._getCompaniesWithVerificationUseCase.execute({
        page: 1,
        limit: 100,
        isVerified: 'pending',
      });
      sendSuccessResponse(res, 'Pending companies retrieved successfully', result);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  getCompanyById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { companyId } = req.params;
    if (!companyId) {
      return handleValidationError('Company ID is required', next);
    }

    try {
      const result = await this._getCompaniesWithVerificationUseCase.execute({
        page: 1,
        limit: 1,
      });
      const company = result.companies[0] || null;
      if (!company) {
        return sendNotFoundResponse(res, 'Company not found');
      }
      
      sendSuccessResponse(res, 'Company retrieved successfully', company);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  verifyCompany = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const parsed = CompanyVerificationDto.safeParse(req.body);
    if (!parsed.success) {
      return handleValidationError('Invalid verification data', next);
    }

    try {
      await this._verifyCompanyUseCase.execute(
        parsed.data.companyId,
        parsed.data.isVerified,
      );

      const message = `Company ${parsed.data.isVerified} successfully`;
      sendSuccessResponse(res, message, null);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };

  blockCompany = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { companyId, isBlocked } = req.body;
    
    if (!companyId || typeof isBlocked !== 'boolean') {
      return handleValidationError('Company ID and isBlocked status are required', next);
    }

    try {
      await this._blockCompanyUseCase.execute(companyId, isBlocked);
      const message = `Company ${isBlocked ? 'blocked' : 'unblocked'} successfully`;
      sendSuccessResponse(res, message, null);
    } catch (error) {
      handleAsyncError(error, next);
    }
  };
}
