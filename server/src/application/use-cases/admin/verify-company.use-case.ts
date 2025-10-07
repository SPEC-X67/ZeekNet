import { ICompanyRepository } from '../../../domain/interfaces/repositories';
import { IVerifyCompanyUseCase } from '../../../domain/interfaces/use-cases';

export class VerifyCompanyUseCase implements IVerifyCompanyUseCase {
  constructor(
    private readonly _companyRepository: ICompanyRepository,
  ) {}

  async execute(companyId: string, isVerified: 'pending' | 'rejected' | 'verified'): Promise<void> {
    await this._companyRepository.updateVerificationStatus(
      companyId,
      isVerified,
    );
  }
}
