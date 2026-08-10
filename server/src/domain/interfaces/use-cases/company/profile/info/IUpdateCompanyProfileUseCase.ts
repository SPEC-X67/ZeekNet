import { SimpleUpdateCompanyProfileRequestDto, CompanyProfileResponseDto } from 'src/application/dtos/company-profile.dto';

export interface IUpdateCompanyProfileUseCase {
  execute(data: SimpleUpdateCompanyProfileRequestDto): Promise<CompanyProfileResponseDto>;
}

