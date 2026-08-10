import { CompanyProfileResponseDto } from 'src/application/dtos/company-profile.dto';
import { ReapplyVerificationRequestDto } from 'src/application/dtos/company-verification.dto';

export interface IReapplyCompanyVerificationUseCase {
  execute(data: ReapplyVerificationRequestDto): Promise<CompanyProfileResponseDto>;
}
