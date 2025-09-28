import { injectable, inject } from 'inversify';
import { TYPES } from '../../../infrastructure/di/types';
import { ICompanyRepository } from '../../../domain/repositories';

@injectable()
export class VerifyCompanyUseCase {
  constructor(
    @inject(TYPES.CompanyRepository)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute(companyId: string, isVerified: 'pending' | 'rejected' | 'verified'): Promise<void> {
    await this.companyRepository.updateVerificationStatus(
      companyId,
      isVerified,
    );
  }
}
