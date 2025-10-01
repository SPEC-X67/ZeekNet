import { injectable, inject } from 'inversify';
import { TYPES } from '../../../infrastructure/di/types';
import { ICompanyRepository } from '../../../domain/repositories';
import { CompanyProfile } from '../../../domain/entities/company-profile.entity';
import { AppError } from '../../../domain/errors/errors';

@injectable()
export class GetCompanyProfileByUserIdUseCase {
  constructor(
    @inject(TYPES.CompanyRepository)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute(userId: string): Promise<CompanyProfile | null> {
    try {
      if (!userId) {
        throw new AppError('User ID is required', 400);
      }

      const companyProfile = await this.companyRepository.getProfileByUserId(userId);
      return companyProfile;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to get company profile by user ID', 500);
    }
  }
}
