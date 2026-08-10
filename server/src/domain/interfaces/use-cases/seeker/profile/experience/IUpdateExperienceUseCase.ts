import { ExperienceResponseDto, UpdateExperienceRequestDto } from 'src/application/dtos/seeker-experience.dto';

export interface IUpdateExperienceUseCase {
  execute(dto: UpdateExperienceRequestDto): Promise<ExperienceResponseDto>;
}

