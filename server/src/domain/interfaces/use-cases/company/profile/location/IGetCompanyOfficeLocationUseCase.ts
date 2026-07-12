import { CompanyLocationResponseDto, GetCompanyOfficeLocationRequestDto } from 'src/application/dtos/company-office-location.dto';

export interface IGetCompanyOfficeLocationUseCase {
  execute(dto: GetCompanyOfficeLocationRequestDto): Promise<CompanyLocationResponseDto[]>;
}
