// Admin Use Case Interfaces
export interface IAdminLoginUseCase {
  execute(email: string, password: string): Promise<any>;
}

export interface IGetAllUsersUseCase {
  execute(options: any): Promise<any>;
}

export interface IBlockUserUseCase {
  execute(userId: string, isBlocked: boolean): Promise<void>;
}

export interface IGetUserByIdUseCase {
  execute(userId: string): Promise<any>;
}

export interface IGetAllCompaniesUseCase {
  execute(options: any): Promise<any>;
}

export interface IGetCompaniesWithVerificationUseCase {
  execute(options: any): Promise<any>;
}

export interface IVerifyCompanyUseCase {
  execute(companyId: string, isVerified: 'pending' | 'rejected' | 'verified'): Promise<void>;
}

export interface IBlockCompanyUseCase {
  execute(companyId: string, isBlocked: boolean): Promise<void>;
}

export interface IAdminGetAllJobsUseCase {
  execute(query: any): Promise<any>;
}

export interface IAdminGetJobByIdUseCase {
  execute(jobId: string): Promise<any>;
}

export interface IAdminUpdateJobStatusUseCase {
  execute(jobId: string, isActive: boolean): Promise<any>;
}

export interface IAdminDeleteJobUseCase {
  execute(jobId: string): Promise<any>;
}

export interface IAdminGetJobStatsUseCase {
  execute(): Promise<any>;
}
