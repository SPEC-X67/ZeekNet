import { CompanyContactResponseDto, GetCompanyContactRequestDto } from 'src/application/dtos/company-contact.dto';

export interface IGetCompanyContactUseCase {
  execute(dto: GetCompanyContactRequestDto): Promise<CompanyContactResponseDto[]>;
}

