import { SkillResponseDto } from 'src/application/dtos/admin/skill.dto';

export interface IGetSkillByIdUseCase {
  execute(skillId: string): Promise<SkillResponseDto>;
}
