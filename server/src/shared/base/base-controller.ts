import { Request, Response, NextFunction } from 'express';
import { User } from '../../domain/entities/user.entity';
import { 
  createSuccessResponse, 
  createErrorResponse, 
  sanitizeUserForResponse,
  ErrorHandler, 
} from '../../shared/utils';

export interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string; role: string };
}

export abstract class BaseController {
  protected createSuccessResponse<T>(
    message: string, 
    data: T, 
    token?: string,
  ) {
    return createSuccessResponse(message, data, token);
  }

  protected createErrorResponse<T>(
    message: string, 
    data: T = null as T,
  ) {
    return createErrorResponse(message, data);
  }

  protected sanitizeUserForResponse(user: User) {
    return sanitizeUserForResponse(user);
  }

  protected extractUserId(req: AuthenticatedRequest): string | null {
    return req.user?.id || null;
  }

  protected validateUserId(req: AuthenticatedRequest): string {
    const userId = this.extractUserId(req);
    if (!userId) {
      throw ErrorHandler.createValidationError('User ID not found');
    }
    return userId;
  }

  protected handleValidationError(message: string, next: NextFunction): void {
    next(ErrorHandler.createValidationError(message));
  }

  protected handleAsyncError(error: unknown, next: NextFunction): void {
    next(ErrorHandler.handleAsyncError(error));
  }

  protected sendSuccessResponse<T>(
    res: Response, 
    message: string, 
    data: T, 
    token?: string,
    statusCode: number = 200,
  ): void {
    res.status(statusCode).json(this.createSuccessResponse(message, data, token));
  }

  protected sendErrorResponse<T>(
    res: Response, 
    message: string, 
    data: T = null as T,
    statusCode: number = 400,
  ): void {
    res.status(statusCode).json(this.createErrorResponse(message, data));
  }

  protected sendNotFoundResponse(res: Response, message: string): void {
    res.status(404).json(this.createErrorResponse(message, null));
  }

  protected success<T>(res: Response, data: T, message: string, statusCode: number = 200): void {
    this.sendSuccessResponse(res, message, data, undefined, statusCode);
  }

  protected created<T>(res: Response, data: T, message: string): void {
    this.sendSuccessResponse(res, message, data, undefined, 201);
  }

  protected unauthorized(res: Response, message: string): void {
    this.sendErrorResponse(res, message, null, 401);
  }

  protected badRequest(res: Response, message: string): void {
    this.sendErrorResponse(res, message, null, 400);
  }

  protected handleError(res: Response, error: unknown): void {
    console.error('Controller error:', error);
    
    if (error && typeof error === 'object' && 'statusCode' in error && 'message' in error) {
      this.sendErrorResponse(res, (error as { message: string }).message, null, (error as { statusCode: number }).statusCode);
    } else if (error instanceof Error) {
      this.sendErrorResponse(res, error.message, null, 500);
    } else {
      this.sendErrorResponse(res, 'Internal server error', null, 500);
    }
  }
}
