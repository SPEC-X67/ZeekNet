import { ExperienceResponseDto, AddExperienceRequestDto } from 'src/application/dtos/seeker-experience.dto';

export interface IAddExperienceUseCase {
  execute(dto: AddExperienceRequestDto): Promise<ExperienceResponseDto>;
}

