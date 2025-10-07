// Manual Dependency Injection for Auth Module
import { BaseUserRepository } from '../database/mongodb/repositories/base-user.repository';
import { MongoCompanyRepository } from '../database/mongodb/repositories/company.repository';

import { BcryptPasswordHasher } from '../security/bcrypt-password-hasher';
import { JwtTokenService } from '../security/jwt-token-service';
import { GoogleAuthTokenVerifier } from '../security/google-token-verifier';
import { PasswordResetServiceImpl } from '../security/password-reset-service';
import { RedisOtpService } from '../database/redis/services/redis-otp-service';
import { NodemailerService } from '../messaging/mailer';

// Auth Use Cases
import { RegisterUserUseCase } from '../../application/use-cases/auth/register-user.use-case';
import { LoginUserUseCase } from '../../application/use-cases/auth/login-user.use-case';
import { AdminLoginUseCase } from '../../application/use-cases/auth/admin-login.use-case';
import { ForgotPasswordUseCase } from '../../application/use-cases/auth/forgot-password.use-case';
import { ResetPasswordUseCase } from '../../application/use-cases/auth/reset-password.use-case';
import { VerifyOtpUseCase } from '../../application/use-cases/auth/verify-otp.use-case';
import { GoogleLoginUseCase } from '../../application/use-cases/auth/google-login.use-case';
import { RefreshTokenUseCase } from '../../application/use-cases/auth/refresh-token.use-case';
import { LogoutUseCase } from '../../application/use-cases/auth/logout.use-case';
import { GetUserByIdUseCase } from '../../application/use-cases/auth/get-user-by-id.use-case';
import { GetUserByEmailUseCase } from '../../application/use-cases/auth/get-user-by-email.use-case';
import { UpdateUserVerificationStatusUseCase } from '../../application/use-cases/auth/update-user-verification-status.use-case';
import { UpdateUserRefreshTokenUseCase } from '../../application/use-cases/auth/update-user-refresh-token.use-case';
import { GetCompanyProfileByUserIdUseCase } from '../../application/use-cases/auth/get-company-profile-by-user-id.use-case';

// Auth Controllers
import { RegistrationController } from '../../presentation/controllers/auth/registration.controller';
import { LoginController } from '../../presentation/controllers/auth/login.controller';
import { TokenController } from '../../presentation/controllers/auth/token.controller';
import { PasswordController } from '../../presentation/controllers/auth/password.controller';
import { OtpController } from '../../presentation/controllers/auth/otp.controller';

// Create Infrastructure Services
const userRepository = new BaseUserRepository() as any;
const companyRepository = new MongoCompanyRepository() as any;
const passwordHasher = new BcryptPasswordHasher();
const tokenService = new JwtTokenService();
const googleTokenVerifier = new GoogleAuthTokenVerifier();
const otpService = new RedisOtpService();
const mailerService = new NodemailerService();
const passwordResetService = new PasswordResetServiceImpl(mailerService);


// Create Use Cases
const registerUserUseCase = new RegisterUserUseCase(
  userRepository,
  passwordHasher,
  otpService,
  mailerService
);

const loginUserUseCase = new LoginUserUseCase(
  userRepository,
  userRepository, // Same instance implements both IUserRepository and IUserAuthRepository
  passwordHasher,
  tokenService,
  otpService,
  mailerService
);

const adminLoginUseCase = new AdminLoginUseCase(
  userRepository,
  userRepository, // Same instance implements both IUserRepository and IUserAuthRepository
  passwordHasher,
  tokenService,
  otpService,
  mailerService
);

const forgotPasswordUseCase = new ForgotPasswordUseCase(
  userRepository,
  passwordResetService
);

const resetPasswordUseCase = new ResetPasswordUseCase(
  passwordHasher,
  passwordResetService,
  userRepository );

const verifyOtpUseCase = new VerifyOtpUseCase(
  otpService,
  userRepository );

const googleLoginUseCase = new GoogleLoginUseCase(
  userRepository ,
  passwordHasher,
  tokenService,
  googleTokenVerifier,
  otpService,
  mailerService
);

const refreshTokenUseCase = new RefreshTokenUseCase(
  userRepository ,
  companyRepository ,
  tokenService,
  passwordHasher
);

const logoutUseCase = new LogoutUseCase(
  userRepository );

const getUserByIdUseCase = new GetUserByIdUseCase(
  userRepository
);

const getUserByEmailUseCase = new GetUserByEmailUseCase(
  userRepository );

const updateUserVerificationStatusUseCase = new UpdateUserVerificationStatusUseCase(
  userRepository );

const updateUserRefreshTokenUseCase = new UpdateUserRefreshTokenUseCase(
  userRepository );

const getCompanyProfileByUserIdUseCase = new GetCompanyProfileByUserIdUseCase(
  companyRepository );

// Create Controllers
export const registrationController = new RegistrationController(
  registerUserUseCase
);

export const loginController = new LoginController(
  loginUserUseCase,
  adminLoginUseCase,
  googleLoginUseCase,
  tokenService,
  passwordHasher,
  updateUserRefreshTokenUseCase
);

export const tokenController = new TokenController(
  refreshTokenUseCase,
  getUserByIdUseCase,
  tokenService,
  getCompanyProfileByUserIdUseCase
);

export const passwordController = new PasswordController(
  forgotPasswordUseCase,
  resetPasswordUseCase,
  logoutUseCase
);

export const otpController = new OtpController(
  otpService,
  mailerService,
  getUserByEmailUseCase,
  updateUserVerificationStatusUseCase,
  updateUserRefreshTokenUseCase,
  tokenService,
  passwordHasher
);

export { userRepository };
