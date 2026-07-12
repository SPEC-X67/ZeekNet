import { UploadBusinessLicenseResult, UploadBusinessLicenseDto } from 'src/application/dtos/company-media.dto';

export interface IUploadBusinessLicenseUseCase {
  execute(dto: UploadBusinessLicenseDto): Promise<UploadBusinessLicenseResult>;
}

