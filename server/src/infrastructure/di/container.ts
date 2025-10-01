import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';

import { BaseUserRepository } from '../database/mongodb/repositories/base-user.repository';
import { MongoCompanyRepository } from '../database/mongodb/repositories/company.repository';
import { MongoJobPostingRepository } from '../database/mongodb/repositories/job-posting.repository';
import { MongoCompanyContactRepository } from '../database/mongodb/repositories/company-contact.repository';
import { MongoCompanyTechStackRepository } from '../database/mongodb/repositories/company-tech-stack.repository';
import { MongoCompanyOfficeLocationRepository } from '../database/mongodb/repositories/company-office-location.repository';
import { MongoCompanyBenefitsRepository } from '../database/mongodb/repositories/company-benefits.repository';
import { MongoCompanyWorkplacePicturesRepository } from '../database/mongodb/repositories/company-workplace-pictures.repository';
import { MongoCompanyTeamRepository } from '../database/mongodb/repositories/company-team.repository';

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
import { GetUserByEmailUseCase } from '../../application/use-cases/auth/get-user-by-email.use-case';
import { UpdateUserVerificationStatusUseCase } from '../../application/use-cases/auth/update-user-verification-status.use-case';
import { UpdateUserRefreshTokenUseCase } from '../../application/use-cases/auth/update-user-refresh-token.use-case';
import { GetCompanyProfileByUserIdUseCase } from '../../application/use-cases/auth/get-company-profile-by-user-id.use-case';

import {
  CreateCompanyProfileUseCase,
  UpdateCompanyProfileUseCase,
  GetCompanyProfileUseCase,
  ReapplyCompanyVerificationUseCase,
} from '../../application/use-cases';

import {
  CompanyContactUseCase,
  CompanyTechStackUseCase,
  CompanyOfficeLocationUseCase,
  CompanyBenefitsUseCase,
  CompanyWorkplacePicturesUseCase,
  CompanyTeamUseCase,
} from '../../application/use-cases/company';

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
import { GetJobPostingForPublicUseCase } from '../../application/use-cases/public/get-job-posting-for-public.use-case';

import {
  GetAllUsersUseCase,
  BlockUserUseCase,
  AdminGetUserByIdUseCase,
  GetAllCompaniesUseCase,
  GetCompaniesWithVerificationUseCase,
  VerifyCompanyUseCase,
} from '../../application/use-cases';
import { BlockCompanyUseCase } from '../../application/use-cases/admin/block-company.use-case';
import { AdminGetAllJobsUseCase } from '../../application/use-cases/admin/get-all-jobs.use-case';
import { AdminGetJobByIdUseCase } from '../../application/use-cases/admin/get-job-by-id.use-case';
import { AdminUpdateJobStatusUseCase } from '../../application/use-cases/admin/update-job-status.use-case';
import { AdminDeleteJobUseCase } from '../../application/use-cases/admin/delete-job.use-case';
import { AdminGetJobStatsUseCase } from '../../application/use-cases/admin/get-job-stats.use-case';

import { RegistrationController } from '../../presentation/controllers/auth/registration.controller';
import { LoginController } from '../../presentation/controllers/auth/login.controller';
import { TokenController } from '../../presentation/controllers/auth/token.controller';
import { PasswordController } from '../../presentation/controllers/auth/password.controller';
import { OtpController } from '../../presentation/controllers/auth/otp.controller';
import { AdminController } from '../../presentation/controllers/admin/admin.controller';
import { AdminJobController } from '../../presentation/controllers/admin/admin-job.controller';
import { CompanyController } from '../../presentation/controllers/company/company.controller';
import { CompanyJobPostingController } from '../../presentation/controllers/company/company-job-posting.controller';
import { SeekerController } from '../../presentation/controllers/seeker/seeker.controller';
import { PublicJobController } from '../../presentation/controllers/public/public-job.controller';

import { AppServer } from '../../presentation/server/app-server';
import { UserBlockedMiddleware } from '../../presentation/middleware/user-blocked.middleware';
import { CompanyVerificationMiddleware } from '../../presentation/middleware/company-verification.middleware';
import { CompanyProfileMapper, JobPostingMapper, UserMapper } from 'src/application/mappers';

const container = new Container();

container.bind(TYPES.UserRepository).to(BaseUserRepository);
container.bind(TYPES.CompanyRepository).to(MongoCompanyRepository);
container.bind(TYPES.JobPostingRepository).to(MongoJobPostingRepository);

container.bind(TYPES.CompanyContactRepository).to(MongoCompanyContactRepository);
container.bind(TYPES.CompanyTechStackRepository).to(MongoCompanyTechStackRepository);
container.bind(TYPES.CompanyOfficeLocationRepository).to(MongoCompanyOfficeLocationRepository);
container.bind(TYPES.CompanyBenefitsRepository).to(MongoCompanyBenefitsRepository);
container.bind(TYPES.CompanyWorkplacePicturesRepository).to(MongoCompanyWorkplacePicturesRepository);
container.bind(TYPES.CompanyTeamRepository).to(MongoCompanyTeamRepository);

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
container.bind(TYPES.GetUserByEmailUseCase).to(GetUserByEmailUseCase);
container.bind(TYPES.UpdateUserVerificationStatusUseCase).to(UpdateUserVerificationStatusUseCase);
container.bind(TYPES.UpdateUserRefreshTokenUseCase).to(UpdateUserRefreshTokenUseCase);
container.bind(TYPES.GetCompanyProfileByUserIdUseCase).to(GetCompanyProfileByUserIdUseCase);

container.bind(TYPES.CreateCompanyProfileUseCase).to(CreateCompanyProfileUseCase);
container.bind(TYPES.UpdateCompanyProfileUseCase).to(UpdateCompanyProfileUseCase);
container.bind(TYPES.GetCompanyProfileUseCase).to(GetCompanyProfileUseCase);
container.bind(TYPES.ReapplyCompanyVerificationUseCase).to(ReapplyCompanyVerificationUseCase);

container.bind(TYPES.CompanyContactUseCase).to(CompanyContactUseCase);
container.bind(TYPES.CompanyTechStackUseCase).to(CompanyTechStackUseCase);
container.bind(TYPES.CompanyOfficeLocationUseCase).to(CompanyOfficeLocationUseCase);
container.bind(TYPES.CompanyBenefitsUseCase).to(CompanyBenefitsUseCase);
container.bind(TYPES.CompanyWorkplacePicturesUseCase).to(CompanyWorkplacePicturesUseCase);
container.bind(TYPES.CompanyTeamUseCase).to(CompanyTeamUseCase);

container.bind(TYPES.CreateJobPostingUseCase).to(CreateJobPostingUseCase);
container.bind(TYPES.GetJobPostingUseCase).to(GetJobPostingUseCase);
container.bind(TYPES.GetCompanyJobPostingsUseCase).to(GetCompanyJobPostingsUseCase);
container.bind(TYPES.GetAllJobPostingsUseCase).to(PublicGetAllJobPostingsUseCase);
container.bind(TYPES.GetJobPostingForPublicUseCase).to(GetJobPostingForPublicUseCase);
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
container.bind(TYPES.BlockCompanyUseCase).to(BlockCompanyUseCase);

container.bind(TYPES.AdminGetAllJobsUseCase).to(AdminGetAllJobsUseCase);
container.bind(TYPES.AdminGetJobByIdUseCase).to(AdminGetJobByIdUseCase);
container.bind(TYPES.AdminUpdateJobStatusUseCase).to(AdminUpdateJobStatusUseCase);
container.bind(TYPES.AdminDeleteJobUseCase).to(AdminDeleteJobUseCase);
container.bind(TYPES.AdminGetJobStatsUseCase).to(AdminGetJobStatsUseCase);

container.bind(TYPES.RegistrationController).to(RegistrationController);
container.bind(TYPES.LoginController).to(LoginController);
container.bind(TYPES.TokenController).to(TokenController);
container.bind(TYPES.PasswordController).to(PasswordController);
container.bind(TYPES.AdminController).to(AdminController);
container.bind(TYPES.AdminJobController).to(AdminJobController);
container.bind(TYPES.CompanyController).to(CompanyController);
container.bind(TYPES.CompanyJobPostingController).to(CompanyJobPostingController);
container.bind(TYPES.SeekerController).to(SeekerController);
container.bind(TYPES.OtpController).to(OtpController);
container.bind(TYPES.PublicJobController).to(PublicJobController);

container.bind(TYPES.AppServer).to(AppServer);
container.bind(TYPES.UserBlockedMiddleware).to(UserBlockedMiddleware);
container.bind(TYPES.CompanyVerificationMiddleware).to(CompanyVerificationMiddleware);

export { container };
