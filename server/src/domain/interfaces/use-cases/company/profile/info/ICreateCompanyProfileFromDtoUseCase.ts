import { CreateCompanyProfileFromDtoRequestDto, CompanyProfileResponseDto } from 'src/application/dtos/company-profile.dto';

export interface ICreateCompanyProfileFromDtoUseCase {
  execute(data: CreateCompanyProfileFromDtoRequestDto): Promise<CompanyProfileResponseDto>;
}

