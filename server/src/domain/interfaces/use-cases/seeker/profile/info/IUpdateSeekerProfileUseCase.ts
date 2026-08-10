import { SeekerProfileResponseDto, UpdateSeekerProfileRequestDto } from 'src/application/dtos/seeker-profile.dto';

export interface IUpdateSeekerProfileUseCase {
  execute(dto: UpdateSeekerProfileRequestDto): Promise<SeekerProfileResponseDto>;
}

