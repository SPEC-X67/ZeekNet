import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';

import { MongoUserRepository } from '../database/mongodb/repositories/user.repository';
import { MongoCompanyRepository } from '../database/mongodb/repositories/company.repository';
import { MongoJobPostingRepository } from '../database/mongodb/repositories/job-posting.repository';

import { BcryptPasswordHasher } from '../security/bcrypt-password-hasher';
import { JwtTokenService } from '../security/jwt-token-service';
import { GoogleAuthTokenVerifier } from '../security/google-token-verifier';
import { PasswordResetServiceImpl } from '../security/password-reset-service';
import { RedisOtpService } from '../database/redis/services/redis-otp-service';
import { NodemailerService } from '../messaging/mailer';
import { S3Service } from '../external-services/s3/s3.service';


import {
  RegisterUserUseCase,
  LoginUserUseCase,
  AdminLoginUseCase,
  ForgotPasswordUseCase,
  ResetPasswordUseCase,
  VerifyOtpUseCase,
  GoogleLoginUseCase,
  RefreshTokenUseCase,
  LogoutUseCase,
  AuthGetUserByIdUseCase,
} from '../../application/use-cases';

import {
  CreateCompanyProfileUseCase,
  UpdateCompanyProfileUseCase,
  GetCompanyProfileUseCase,
  ReapplyCompanyVerificationUseCase,
} from '../../application/use-cases';

import {
  CreateJobPostingUseCase,
  GetJobPostingUseCase,
  GetCompanyJobPostingsUseCase,
  UpdateJobPostingUseCase,
  DeleteJobPostingUseCase,
  IncrementJobViewCountUseCase,
  UpdateJobStatusUseCase,
} from '../../application/use-cases';

import { GetAllJobPostingsUseCase as PublicGetAllJobPostingsUseCase } from '../../application/use-cases/public/get-all-job-postings.use-case';

import {
  GetAllUsersUseCase,
  BlockUserUseCase,
  AdminGetUserByIdUseCase,
  GetAllCompaniesUseCase,
  GetCompaniesWithVerificationUseCase,
  VerifyCompanyUseCase,
} from '../../application/use-cases';

import { RegistrationController } from '../../presentation/controllers/auth/registration.controller';
import { LoginController } from '../../presentation/controllers/auth/login.controller';
import { TokenController } from '../../presentation/controllers/auth/token.controller';
import { PasswordController } from '../../presentation/controllers/auth/password.controller';
import { OtpController } from '../../presentation/controllers/auth/otp.controller';
import { AdminController } from '../../presentation/controllers/admin/admin.controller';
import { CompanyController } from '../../presentation/controllers/company/company.controller';
import { CompanyJobPostingController } from '../../presentation/controllers/company/company-job-posting.controller';
import { SeekerController } from '../../presentation/controllers/seeker/seeker.controller';
import { PublicJobController } from '../../presentation/controllers/public/public-job.controller';

import { AppServer } from '../../presentation/server/app-server';
import { UserBlockedMiddleware } from '../../presentation/middleware/user-blocked.middleware';
import { CompanyProfileMapper, JobPostingMapper, UserMapper } from 'src/application/mappers';

const container = new Container();

container.bind(TYPES.UserRepository).to(MongoUserRepository);
container.bind(TYPES.CompanyRepository).to(MongoCompanyRepository);
container.bind(TYPES.JobPostingRepository).to(MongoJobPostingRepository);

container.bind(TYPES.CompanyProfileMapper).to(CompanyProfileMapper);
container.bind(TYPES.JobPostingMapper).to(JobPostingMapper);
container.bind(TYPES.UserMapper).to(UserMapper);

container.bind(TYPES.PasswordHasher).to(BcryptPasswordHasher);
container.bind(TYPES.TokenService).to(JwtTokenService);
container.bind(TYPES.GoogleTokenVerifier).to(GoogleAuthTokenVerifier);
container.bind(TYPES.PasswordResetService).to(PasswordResetServiceImpl);
container.bind(TYPES.OtpService).to(RedisOtpService);
container.bind(TYPES.MailerService).to(NodemailerService);
container.bind(TYPES.S3Service).to(S3Service);

container.bind(TYPES.RegisterUserUseCase).to(RegisterUserUseCase);
container.bind(TYPES.LoginUserUseCase).to(LoginUserUseCase);
container.bind(TYPES.AdminLoginUseCase).to(AdminLoginUseCase);
container.bind(TYPES.ForgotPasswordUseCase).to(ForgotPasswordUseCase);
container.bind(TYPES.ResetPasswordUseCase).to(ResetPasswordUseCase);
container.bind(TYPES.VerifyOtpUseCase).to(VerifyOtpUseCase);
container.bind(TYPES.GoogleLoginUseCase).to(GoogleLoginUseCase);
container.bind(TYPES.RefreshTokenUseCase).to(RefreshTokenUseCase);
container.bind(TYPES.LogoutUseCase).to(LogoutUseCase);
container.bind(TYPES.GetUserByIdUseCase).to(AuthGetUserByIdUseCase);

container.bind(TYPES.CreateCompanyProfileUseCase).to(CreateCompanyProfileUseCase);
container.bind(TYPES.UpdateCompanyProfileUseCase).to(UpdateCompanyProfileUseCase);
container.bind(TYPES.GetCompanyProfileUseCase).to(GetCompanyProfileUseCase);
container.bind(TYPES.ReapplyCompanyVerificationUseCase).to(ReapplyCompanyVerificationUseCase);

container.bind(TYPES.CreateJobPostingUseCase).to(CreateJobPostingUseCase);
container.bind(TYPES.GetJobPostingUseCase).to(GetJobPostingUseCase);
container.bind(TYPES.GetCompanyJobPostingsUseCase).to(GetCompanyJobPostingsUseCase);
container.bind(TYPES.GetAllJobPostingsUseCase).to(PublicGetAllJobPostingsUseCase);
container.bind(TYPES.UpdateJobPostingUseCase).to(UpdateJobPostingUseCase);
container.bind(TYPES.DeleteJobPostingUseCase).to(DeleteJobPostingUseCase);
container.bind(TYPES.IncrementJobViewCountUseCase).to(IncrementJobViewCountUseCase);
container.bind(TYPES.UpdateJobStatusUseCase).to(UpdateJobStatusUseCase);

container.bind(TYPES.GetAllUsersUseCase).to(GetAllUsersUseCase);
container.bind(TYPES.BlockUserUseCase).to(BlockUserUseCase);
container.bind(TYPES.AdminGetUserByIdUseCase).to(AdminGetUserByIdUseCase);
container.bind(TYPES.GetAllCompaniesUseCase).to(GetAllCompaniesUseCase);
container.bind(TYPES.GetCompaniesWithVerificationUseCase).to(GetCompaniesWithVerificationUseCase);
container.bind(TYPES.VerifyCompanyUseCase).to(VerifyCompanyUseCase);

container.bind(TYPES.RegistrationController).to(RegistrationController);
container.bind(TYPES.LoginController).to(LoginController);
container.bind(TYPES.TokenController).to(TokenController);
container.bind(TYPES.PasswordController).to(PasswordController);
container.bind(TYPES.AdminController).to(AdminController);
container.bind(TYPES.CompanyController).to(CompanyController);
container.bind(TYPES.CompanyJobPostingController).to(CompanyJobPostingController);
container.bind(TYPES.SeekerController).to(SeekerController);
container.bind(TYPES.OtpController).to(OtpController);
container.bind(TYPES.PublicJobController).to(PublicJobController);

container.bind(TYPES.AppServer).to(AppServer);
container.bind(TYPES.UserBlockedMiddleware).to(UserBlockedMiddleware);

export { container };
