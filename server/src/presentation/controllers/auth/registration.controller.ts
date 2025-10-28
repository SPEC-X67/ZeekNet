import { Request, Response, NextFunction } from 'express';
import { RegisterDto } from '../../../application/dto/auth';
import { IRegisterUserUseCase } from '../../../domain/interfaces/use-cases';
import { validateBody } from '../../middleware/validation.middleware';
import { handleAsyncError, sendSuccessResponse } from '../../../shared/utils';

export class RegistrationController {
  constructor(private readonly _registerUserUseCase: IRegisterUserUseCase) {}

  register = [
    validateBody(RegisterDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { user } = await this._registerUserUseCase.execute(req.body.email, req.body.password, req.body.role, req.body.name);

        sendSuccessResponse(res, 'User registered successfully. Please verify your email.', user, undefined, 201);
      } catch (error) {
        handleAsyncError(error, next);
      }
    },
  ];
}
