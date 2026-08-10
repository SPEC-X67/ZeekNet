import { SeekerProfileResponseDto } from 'src/application/dtos/seeker-profile.dto';

export interface IGetSeekerProfileUseCase {
  execute(userId: string): Promise<SeekerProfileResponseDto>;
}

