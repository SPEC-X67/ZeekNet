import { GetAllSkillsRequestDto, PaginatedSkillsResultDto } from 'src/application/dtos/admin/attributes/skills/skill.dto';

export interface IGetAllSkillsUseCase {
  execute(options: GetAllSkillsRequestDto): Promise<PaginatedSkillsResultDto>;
}

