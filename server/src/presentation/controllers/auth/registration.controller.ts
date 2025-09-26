import { injectable, inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { TYPES } from '../../../infrastructure/di/types';
import { RegisterDto } from '../../../application/dto/auth';
import { RegisterUserUseCase } from '../../../application/use-cases/auth/register-user.use-case';
import { BaseController } from '../../../shared';
import { validateBody } from '../../middleware/validation.middleware';

@injectable()
export class RegistrationController extends BaseController {
  constructor(
    @inject(TYPES.RegisterUserUseCase) 
    private readonly registerUserUseCase: RegisterUserUseCase,
  ) {
    super();
  }

  register = [
    validateBody(RegisterDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const result = await this.registerUserUseCase.execute(
          req.body.email,
          req.body.password,
          req.body.role,
          req.body.name,
        );

        if (result.isFailure()) {
          return this.handleAsyncError(result.error!, next);
        }

        const { user } = result.value!;
        const userDetails = this.sanitizeUserForResponse(user);

        this.sendSuccessResponse(
          res, 
          'User registered successfully. Please verify your email.', 
          userDetails, 
          undefined, 
          201,
        );
      } catch (error) {
        this.handleAsyncError(error, next);
      }
    },
  ];
}