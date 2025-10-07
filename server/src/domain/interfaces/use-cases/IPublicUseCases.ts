// Public Use Case Interfaces
export interface IGetAllJobPostingsUseCase {
  execute(query: any): Promise<any>;
}

export interface IGetJobPostingForPublicUseCase {
  execute(jobId: string): Promise<any>;
}
