import { Router } from 'express';
import { RegistrationController } from '../controllers/auth/registration.controller';
import { LoginController } from '../controllers/auth/login.controller';
import { TokenController } from '../controllers/auth/token.controller';
import { PasswordController } from '../controllers/auth/password.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { OtpController } from '../controllers/auth/otp.controller';

export function createAuthRouter(
  registrationController: RegistrationController,
  loginController: LoginController,
  tokenController: TokenController,
  passwordController: PasswordController,
  otpController: OtpController,
): Router {
  const router = Router();
  router.post('/register', registrationController.register);
  router.post('/login', loginController.login);
  router.post('/admin-login', loginController.adminLogin);
  router.post('/login/google', loginController.googleLogin);
  router.post('/refresh', tokenController.refresh);
  router.post('/logout', passwordController.logout);
  router.get('/check-auth', authenticateToken, tokenController.checkAuth);
  router.post('/forgot-password', passwordController.forgotPassword);
  router.post('/reset-password', passwordController.resetPassword);
  router.post('/otp-request', otpController.request);
  router.post('/otp-verify', otpController.verify);
  return router;
}
