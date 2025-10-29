import { Request, Response, NextFunction } from 'express';
import { IUserRepository } from '../../domain/interfaces/repositories/user/IUserRepository';
import { ICompanyProfileRepository } from '../../domain/interfaces/repositories/company/ICompanyProfileRepository';
import { AuthorizationError } from '../../domain/errors/errors';
import { UserRole } from '../../domain/enums/user-role.enum';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export class UserBlockedMiddleware {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _companyRepository: ICompanyProfileRepository,
  ) {}

  checkUserBlocked = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return next();
      }

      const user = await this._userRepository.findById(userId);
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
        const companyProfile = await this._companyRepository.getProfileByUserId(user.id);
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
