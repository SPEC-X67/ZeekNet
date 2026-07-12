import { UpdateCompanyOfficeLocationRequestDto, CompanyLocationResponseDto } from 'src/application/dtos/company-office-location.dto';

export interface IUpdateCompanyOfficeLocationUseCase {
  execute(data: UpdateCompanyOfficeLocationRequestDto): Promise<CompanyLocationResponseDto>;
}

