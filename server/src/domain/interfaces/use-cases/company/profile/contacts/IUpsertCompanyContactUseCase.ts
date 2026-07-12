import { CompanyContactResponseDto, UpsertCompanyContactRequestDto } from 'src/application/dtos/company-contact.dto';

export interface IUpsertCompanyContactUseCase {
  execute(dto: UpsertCompanyContactRequestDto): Promise<CompanyContactResponseDto>;
}

