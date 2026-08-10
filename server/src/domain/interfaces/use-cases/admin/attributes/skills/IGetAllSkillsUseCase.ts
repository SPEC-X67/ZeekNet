import { GetAllSkillsRequestDto, PaginatedSkillsResultDto } from 'src/application/dtos/skill.dto';

export interface IGetAllSkillsUseCase {
  execute(options: GetAllSkillsRequestDto): Promise<PaginatedSkillsResultDto>;
}

