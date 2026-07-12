import { ExperienceResponseDto } from 'src/application/dtos/seeker-experience.dto';

export interface IGetExperiencesUseCase {
  execute(userId: string): Promise<ExperienceResponseDto[]>;
}

