import { ICompanyProfileRepository } from '../../../domain/interfaces/repositories';
import { AppError } from '../../../domain/errors/errors';

export class BlockCompanyUseCase {
  constructor(
    private readonly _companyProfileRepository: ICompanyProfileRepository,
  ) {}

  async execute(companyId: string, isBlocked: boolean): Promise<void> {
    try {
      if (!companyId) {
        throw new AppError('Company ID is required', 400);
      }

      if (typeof isBlocked !== 'boolean') {
        throw new AppError('isBlocked must be a boolean value', 400);
      }

      await this._companyProfileRepository.updateProfile(companyId, { isBlocked });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to update company block status', 500);
    }
  }
}
