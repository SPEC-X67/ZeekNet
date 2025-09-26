import { ValidationError, AuthenticationError, AuthorizationError } from '../../domain/errors/errors';

export class ErrorHandler {
  static createValidationError(message: string): ValidationError {
    return new ValidationError(message);
  }

  static createAuthenticationError(message: string): AuthenticationError {
    return new AuthenticationError(message);
  }

  static createAuthorizationError(message: string): AuthorizationError {
    return new AuthorizationError(message);
  }

  static handleAsyncError(error: unknown): Error {
    if (error instanceof Error) {
      return error;
    }
    return new Error('An unexpected error occurred');
  }

  static isValidationError(error: unknown): error is ValidationError {
    return error instanceof ValidationError;
  }

  static isAuthenticationError(error: unknown): error is AuthenticationError {
    return error instanceof AuthenticationError;
  }

  static isAuthorizationError(error: unknown): error is AuthorizationError {
    return error instanceof AuthorizationError;
  }
}
