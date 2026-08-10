import { CreateCompanyProfileRequestDtoType, CompanyProfileResponseDto } from 'src/application/dtos/company-profile.dto';

export interface ICreateCompanyProfileUseCase {
  execute(data: CreateCompanyProfileRequestDtoType): Promise<CompanyProfileResponseDto>;
}

