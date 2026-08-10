import { SeekerProfileResponseDto, CreateSeekerProfileRequestDto } from 'src/application/dtos/seeker-profile.dto';

export interface ICreateSeekerProfileUseCase {
  execute(dto: CreateSeekerProfileRequestDto): Promise<SeekerProfileResponseDto>;
}

