import { injectable, inject } from 'inversify';
import { TYPES } from '../../../infrastructure/di/types';
import { ICompanyRepository } from '../../../domain/repositories';
import { AppError } from '../../../domain/errors/errors';

@injectable()
export class BlockCompanyUseCase {
  constructor(
    @inject(TYPES.CompanyRepository)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute(companyId: string, isBlocked: boolean): Promise<void> {
    try {
      if (!companyId) {
        throw new AppError('Company ID is required', 400);
      }

      if (typeof isBlocked !== 'boolean') {
        throw new AppError('isBlocked must be a boolean value', 400);
      }

      await this.companyRepository.updateProfile(companyId, { isBlocked });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to update company block status', 500);
    }
  }
}
