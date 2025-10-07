// Company Use Case Interfaces
export interface ICreateCompanyProfileUseCase {
  execute(userId: string, profileData: any): Promise<any>;
}

export interface IUpdateCompanyProfileUseCase {
  execute(profileId: string, updates: any): Promise<any>;
}

export interface IGetCompanyProfileUseCase {
  execute(userId: string): Promise<any>;
}

export interface IReapplyCompanyVerificationUseCase {
  execute(userId: string, verificationData: any): Promise<any>;
}

export interface ICompanyContactUseCase {
  execute(companyId: string, contactData: any): Promise<any>;
}

export interface ICompanyTechStackUseCase {
  execute(companyId: string, techStackData: any): Promise<any>;
}

export interface ICompanyOfficeLocationUseCase {
  execute(companyId: string, locationData: any): Promise<any>;
}

export interface ICompanyBenefitsUseCase {
  execute(companyId: string, benefitsData: any): Promise<any>;
}

export interface ICompanyWorkplacePicturesUseCase {
  execute(companyId: string, picturesData: any): Promise<any>;
}

export interface ICompanyTeamUseCase {
  execute(companyId: string, teamData: any): Promise<any>;
}

export interface ICreateJobPostingUseCase {
  execute(companyId: string, jobData: any): Promise<any>;
}

export interface IGetJobPostingUseCase {
  execute(jobId: string): Promise<any>;
}

export interface IGetCompanyJobPostingsUseCase {
  execute(companyId: string, options: any): Promise<any>;
}

export interface IUpdateJobPostingUseCase {
  execute(jobId: string, updates: any): Promise<any>;
}

export interface IDeleteJobPostingUseCase {
  execute(jobId: string): Promise<any>;
}

export interface IIncrementJobViewCountUseCase {
  execute(jobId: string, userRole: string): Promise<void>;
}

export interface IUpdateJobStatusUseCase {
  execute(jobId: string, isActive: boolean): Promise<any>;
}
