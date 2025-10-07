import { Request, Response, NextFunction } from 'express';
import { RegisterDto } from '../../../application/dto/auth';
import { RegisterUserUseCase } from '../../../application/use-cases/auth/register-user.use-case';
import { validateBody } from '../../middleware/validation.middleware';
import { handleAsyncError, sanitizeUserForResponse, sendSuccessResponse } from '../../../shared/utils';

export class RegistrationController {
  constructor(
    private readonly _registerUserUseCase: RegisterUserUseCase,
  ) {}

  register = [
    validateBody(RegisterDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { user } = await this._registerUserUseCase.execute(
          req.body.email,
          req.body.password,
          req.body.role,
          req.body.name,
        );

        const userDetails = sanitizeUserForResponse(user);

        sendSuccessResponse(
          res, 
          'User registered successfully. Please verify your email.', 
          userDetails, 
          undefined, 
          201,
        );
      } catch (error) {
        handleAsyncError(error, next);
      }
    },
  ];
}