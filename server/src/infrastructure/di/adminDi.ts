// Admin Manual Dependency Injection
import { BaseUserRepository } from '../database/mongodb/repositories/base-user.repository';
import { MongoCompanyRepository } from '../database/mongodb/repositories/company.repository';
import { MongoJobPostingRepository } from '../database/mongodb/repositories/job-posting.repository';
import { JobPostingMapper } from '../../application/mappers/job-posting.mapper';
import { UserMapper } from '../../application/mappers/user.mapper';
import { CompanyProfileMapper } from '../../application/mappers/company-profile.mapper';
import { BcryptPasswordHasher } from '../security/bcrypt-password-hasher';
import { JwtTokenService } from '../security/jwt-token-service';
import { RedisOtpService } from '../database/redis/services/redis-otp-service';
import { NodemailerService } from '../messaging/mailer';

// Admin Use Cases
import { AdminLoginUseCase } from '../../application/use-cases/auth/admin-login.use-case';
import { GetAllUsersUseCase } from '../../application/use-cases/admin/get-all-users.use-case';
import { BlockUserUseCase } from '../../application/use-cases/admin/block-user.use-case';
import { GetUserByIdUseCase } from '../../application/use-cases/admin/get-user-by-id.use-case';
import { GetAllCompaniesUseCase } from '../../application/use-cases/admin/get-all-companies.use-case';
import { GetCompaniesWithVerificationUseCase } from '../../application/use-cases/admin/get-companies-with-verification.use-case';
import { VerifyCompanyUseCase } from '../../application/use-cases/admin/verify-company.use-case';
import { BlockCompanyUseCase } from '../../application/use-cases/admin/block-company.use-case';
import { AdminGetAllJobsUseCase } from '../../application/use-cases/admin/get-all-jobs.use-case';
import { AdminGetJobByIdUseCase } from '../../application/use-cases/admin/get-job-by-id.use-case';
import { AdminUpdateJobStatusUseCase } from '../../application/use-cases/admin/update-job-status.use-case';
import { AdminDeleteJobUseCase } from '../../application/use-cases/admin/delete-job.use-case';
import { AdminGetJobStatsUseCase } from '../../application/use-cases/admin/get-job-stats.use-case';

// Admin Controllers
import { AdminController } from '../../presentation/controllers/admin/admin.controller';
import { AdminJobController } from '../../presentation/controllers/admin/admin-job.controller';

// Create repository instances
const userRepository = new BaseUserRepository() as any;
const companyRepository = new MongoCompanyRepository() as any;
const jobPostingRepository = new MongoJobPostingRepository() as any;

// Create service instances
const passwordHasher = new BcryptPasswordHasher();
const tokenService = new JwtTokenService();
const otpService = new RedisOtpService();
const mailerService = new NodemailerService();

// Create mapper instances
const jobPostingMapper = new JobPostingMapper();
const userMapper = new UserMapper();
const companyProfileMapper = new CompanyProfileMapper();

// Create use case instances
const adminLoginUseCase = new AdminLoginUseCase(
  userRepository,
  passwordHasher,
  tokenService,
  otpService,
  mailerService
);

const getAllUsersUseCase = new GetAllUsersUseCase(
  userRepository,
  userMapper
);

const blockUserUseCase = new BlockUserUseCase(
  userRepository
);

const adminGetUserByIdUseCase = new GetUserByIdUseCase(
  userRepository,
  userMapper
);

const getAllCompaniesUseCase = new GetAllCompaniesUseCase(
  companyRepository,
  companyProfileMapper
);

const getCompaniesWithVerificationUseCase = new GetCompaniesWithVerificationUseCase(
  companyRepository,
  companyProfileMapper
);

const verifyCompanyUseCase = new VerifyCompanyUseCase(
  companyRepository
);

const blockCompanyUseCase = new BlockCompanyUseCase(
  companyRepository
);

const adminGetAllJobsUseCase = new AdminGetAllJobsUseCase(
  jobPostingRepository,
  jobPostingMapper
);

const adminGetJobByIdUseCase = new AdminGetJobByIdUseCase(
  jobPostingRepository,
  jobPostingMapper
);

const adminUpdateJobStatusUseCase = new AdminUpdateJobStatusUseCase(
  jobPostingRepository
);

const adminDeleteJobUseCase = new AdminDeleteJobUseCase(
  jobPostingRepository
);

const adminGetJobStatsUseCase = new AdminGetJobStatsUseCase(
  jobPostingRepository
);

// Create controller instances
const adminController = new AdminController(
  getAllUsersUseCase,
  blockUserUseCase,
  adminGetUserByIdUseCase,
  getAllCompaniesUseCase,
  getCompaniesWithVerificationUseCase,
  verifyCompanyUseCase,
  blockCompanyUseCase
);

const adminJobController = new AdminJobController(
  adminGetAllJobsUseCase,
  adminGetJobByIdUseCase,
  adminUpdateJobStatusUseCase,
  adminDeleteJobUseCase,
  adminGetJobStatsUseCase
);

export {
  adminController,
  adminJobController
};
