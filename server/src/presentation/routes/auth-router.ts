import { Router } from 'express';
import { 
  registrationController, 
  loginController, 
  tokenController, 
  passwordController, 
  otpController 
} from '../../infrastructure/di/authDi';
import { authenticateToken } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validation.middleware';
import { RegisterDto, LoginDto, GoogleLoginDto, RefreshTokenDto, ForgotPasswordDto, ResetPasswordDto } from '../../application/dto/auth';

export class AuthRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/register',
      validateBody(RegisterDto),
      registrationController.register
    );

    this.router.post(
      '/login',
      loginController.login
    );

    this.router.post(
      '/admin-login',
      loginController.adminLogin
    );

    this.router.post(
      '/login/google',
      loginController.googleLogin
    );

    this.router.post(
      '/refresh',
      tokenController.refresh
    );

    this.router.get(
      '/check-auth',
      authenticateToken,
      tokenController.checkAuth
    );

    this.router.post(
      '/forgot-password',
      passwordController.forgotPassword
    );

    this.router.post(
      '/reset-password',
      passwordController.resetPassword
    );

    this.router.post(
      '/logout',
      passwordController.logout
    );

    this.router.post(
      '/otp-request',
      otpController.request
    );

    this.router.post(
      '/otp-verify',
      otpController.verify
    );
  }
}
