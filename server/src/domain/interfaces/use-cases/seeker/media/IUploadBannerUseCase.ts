import { SeekerProfileResponseDto } from 'src/application/dtos/seeker-profile.dto';
import { UploadBannerDto } from 'src/application/dtos/seeker-media.dto';

export interface IUploadBannerUseCase {
  execute(dto: UploadBannerDto): Promise<SeekerProfileResponseDto>;
}

