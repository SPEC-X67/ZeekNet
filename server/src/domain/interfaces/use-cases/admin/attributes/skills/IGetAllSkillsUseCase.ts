import { GetAllSkillsRequestDto, PaginatedSkillsResultDto } from 'src/application/dtos/admin/skill.dto';

export interface IGetAllSkillsUseCase {
  execute(options: GetAllSkillsRequestDto): Promise<PaginatedSkillsResultDto>;
}

