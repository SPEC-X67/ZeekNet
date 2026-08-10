import { CompanyProfileResponseDto } from 'src/application/dtos/company-profile.dto';

export interface IGetCompanyProfileByUserIdUseCase {
  execute(userId: string): Promise<CompanyProfileResponseDto | null>;
}
