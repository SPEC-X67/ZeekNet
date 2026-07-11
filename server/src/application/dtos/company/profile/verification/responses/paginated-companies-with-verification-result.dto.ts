import { CompanyWithVerificationResult } from 'src/application/dtos/admin/company.dto';

export interface PaginatedCompaniesWithVerificationResultDto {
  companies: CompanyWithVerificationResult[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

