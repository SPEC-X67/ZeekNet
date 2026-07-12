import { CompanyProfileWithDetailsResponseDto } from 'src/application/dtos/company-profile.dto';

export interface IGetCompanyProfileWithJobPostingsUseCase {
  execute(userId: string): Promise<CompanyProfileWithDetailsResponseDto>;
}

