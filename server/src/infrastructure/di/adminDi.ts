import { UserRepository } from '../database/mongodb/repositories/user.repository';
import { CompanyProfileRepository } from '../database/mongodb/repositories/company-profile.repository';
import { CompanyListingRepository } from '../database/mongodb/repositories/company-listing.repository';
import { CompanyVerificationRepository } from '../database/mongodb/repositories/company-verification.repository';
import { JobPostingRepository } from '../database/mongodb/repositories/job-posting.repository';
import { BcryptPasswordHasher } from '../security/bcrypt-password-hasher';
import { JwtTokenService } from '../security/jwt-token-service';
import { RedisOtpService } from '../database/redis/services/redis-otp-service';
import { NodemailerService } from '../messaging/mailer';
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
import { AdminController } from '../../presentation/controllers/admin/admin.controller';
import { AdminJobController } from '../../presentation/controllers/admin/admin-job.controller';

const userRepository = new UserRepository();
const companyProfileRepository = new CompanyProfileRepository();
const companyListingRepository = new CompanyListingRepository();
const companyVerificationRepository = new CompanyVerificationRepository();
const jobPostingRepository = new JobPostingRepository();

const passwordHasher = new BcryptPasswordHasher();
const tokenService = new JwtTokenService();
const otpService = new RedisOtpService();
const mailerService = new NodemailerService();

const adminLoginUseCase = new AdminLoginUseCase(userRepository, userRepository, passwordHasher, tokenService, otpService, mailerService);

const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);

const blockUserUseCase = new BlockUserUseCase(userRepository);

const adminGetUserByIdUseCase = new GetUserByIdUseCase(userRepository);

const getAllCompaniesUseCase = new GetAllCompaniesUseCase(companyListingRepository);

const getCompaniesWithVerificationUseCase = new GetCompaniesWithVerificationUseCase(companyListingRepository, companyVerificationRepository);

const verifyCompanyUseCase = new VerifyCompanyUseCase(companyVerificationRepository);

const blockCompanyUseCase = new BlockCompanyUseCase(companyProfileRepository);

const adminGetAllJobsUseCase = new AdminGetAllJobsUseCase(jobPostingRepository);

const adminGetJobByIdUseCase = new AdminGetJobByIdUseCase(jobPostingRepository);

const adminUpdateJobStatusUseCase = new AdminUpdateJobStatusUseCase(jobPostingRepository);

const adminDeleteJobUseCase = new AdminDeleteJobUseCase(jobPostingRepository);

const adminGetJobStatsUseCase = new AdminGetJobStatsUseCase(jobPostingRepository);

const adminController = new AdminController(getAllUsersUseCase, blockUserUseCase, adminGetUserByIdUseCase, getAllCompaniesUseCase, getCompaniesWithVerificationUseCase, verifyCompanyUseCase, blockCompanyUseCase);

const adminJobController = new AdminJobController(adminGetAllJobsUseCase, adminGetJobByIdUseCase, adminUpdateJobStatusUseCase, adminDeleteJobUseCase, adminGetJobStatsUseCase);

export { adminController, adminJobController };
