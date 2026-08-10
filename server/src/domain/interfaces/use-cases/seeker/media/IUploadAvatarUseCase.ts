import { SeekerProfileResponseDto } from 'src/application/dtos/seeker-profile.dto';
import { UploadAvatarDto } from 'src/application/dtos/seeker-media.dto';

export interface IUploadAvatarUseCase {
  execute(dto: UploadAvatarDto): Promise<SeekerProfileResponseDto>;
}

