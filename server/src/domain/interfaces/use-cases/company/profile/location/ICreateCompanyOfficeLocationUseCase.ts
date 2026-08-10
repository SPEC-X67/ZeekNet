import { CreateCompanyOfficeLocationRequestDto, CompanyLocationResponseDto } from 'src/application/dtos/company-office-location.dto';

export interface ICreateCompanyOfficeLocationUseCase {
  execute(data: CreateCompanyOfficeLocationRequestDto): Promise<CompanyLocationResponseDto>;
}

