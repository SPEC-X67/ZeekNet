import { BulkUpdateApplicationsRequestDto, BulkUpdateApplicationsResponseDto } from 'src/application/dtos/company-hiring.dto';

export interface IBulkUpdateApplicationsUseCase {
  execute(dto: BulkUpdateApplicationsRequestDto): Promise<BulkUpdateApplicationsResponseDto>;
}

