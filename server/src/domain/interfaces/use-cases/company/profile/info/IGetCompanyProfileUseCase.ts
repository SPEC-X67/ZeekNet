import { CompanyProfileWithDetailsResponseDto } from 'src/application/dtos/company-profile.dto';

export interface IGetCompanyProfileUseCase {
  execute(userId: string): Promise<CompanyProfileWithDetailsResponseDto | null>;
}

