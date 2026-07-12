import { ResumeMetaResponseDto } from 'src/application/dtos/seeker-profile.dto';
import { UploadResumeRequestDto } from 'src/application/dtos/seeker-media.dto';

export interface IUploadResumeUseCase {
  execute(dto: UploadResumeRequestDto): Promise<ResumeMetaResponseDto>;
}

