import { ICompanyVerificationRepository } from '../../../domain/interfaces/repositories';
import { IVerifyCompanyUseCase } from '../../../domain/interfaces/use-cases';

export class VerifyCompanyUseCase implements IVerifyCompanyUseCase {
  constructor(private readonly _companyVerificationRepository: ICompanyVerificationRepository) {}

  async execute(companyId: string, isVerified: 'pending' | 'rejected' | 'verified'): Promise<void> {
    await this._companyVerificationRepository.updateVerificationStatus(companyId, isVerified);
  }
}
