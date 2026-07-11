import { SkillResponseDto } from 'src/application/dtos/admin/attributes/skills/skill.dto';

export interface IGetSkillByIdUseCase {
  execute(skillId: string): Promise<SkillResponseDto>;
}
