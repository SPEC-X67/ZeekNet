import { UploadLogoRequestDto, UploadLogoResult } from 'src/application/dtos/company-media.dto';

export interface IUploadLogoUseCase {
  execute(data: UploadLogoRequestDto): Promise<UploadLogoResult>;
}

