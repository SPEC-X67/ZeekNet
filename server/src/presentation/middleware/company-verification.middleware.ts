import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../infrastructure/di/types';
import { ICompanyRepository } from '../../domain/repositories';
import { UserRole } from '../../domain/enums/user-role.enum';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

@injectable()
export class CompanyVerificationMiddleware {
  constructor(
    @inject(TYPES.CompanyRepository)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  checkCompanyVerified = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user?.id;
      const userRole = req.user?.role;

      if (userRole !== UserRole.COMPANY) {
        return next();
      }

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated',
          data: null,
        });
        return;
      }

      const companyProfile = await this.companyRepository.getProfileByUserId(userId);
      
      if (!companyProfile) {
        res.status(403).json({
          success: false,
          message: 'Company profile not found. Please complete your profile setup.',
          data: null,
        });
        return;
      }

      if (companyProfile.isVerified !== 'verified') {
        res.status(403).json({
          success: false,
          message: 'Company profile is not verified. Please wait for admin approval.',
          data: {
            verificationStatus: companyProfile.isVerified,
            profileId: companyProfile.id,
          },
        });
        return;
      }

      next();
    } catch (error) {
      console.error('Error in company verification middleware:', error);
      next(error);
    }
  };
}
