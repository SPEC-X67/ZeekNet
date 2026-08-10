import { DeleteCompanyOfficeLocationRequestDto } from 'src/application/dtos/company-office-location.dto';

export interface IDeleteCompanyOfficeLocationUseCase {
  execute(dto: DeleteCompanyOfficeLocationRequestDto): Promise<void>;
}
