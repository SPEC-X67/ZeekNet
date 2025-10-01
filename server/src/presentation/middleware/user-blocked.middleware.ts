import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../infrastructure/di/types';
import { IUserRepositoryFull, ICompanyRepository } from '../../domain/repositories';
import { AuthorizationError } from '../../domain/errors/errors';
import { UserRole } from '../../domain/enums/user-role.enum';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

@injectable()
export class UserBlockedMiddleware {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepositoryFull,
    @inject(TYPES.CompanyRepository)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  checkUserBlocked = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return next();
      }

      const user = await this.userRepository.findById(userId);
      if (!user) {
        return next();
      }

      if (user.isBlocked) {
        res.status(403).json({
          success: false,
          message: 'User account is blocked. Please contact support for assistance.',
          data: null,
        });
        return;
      }

      if (user.role === UserRole.COMPANY) {
        const companyProfile = await this.companyRepository.getProfileByUserId(user.id);
        if (companyProfile && companyProfile.isBlocked) {
          res.status(403).json({
            success: false,
            message: 'Company account is blocked. Please contact support for assistance.',
            data: null,
          });
          return;
        }
      }

      next();
    } catch (error) {
      console.error('Error in user blocked middleware:', error);
      next(error);
    }
  };
}
