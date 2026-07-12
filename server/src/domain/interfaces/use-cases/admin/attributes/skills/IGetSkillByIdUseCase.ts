import { SkillResponseDto } from 'src/application/dtos/skill.dto';

export interface IGetSkillByIdUseCase {
  execute(skillId: string): Promise<SkillResponseDto>;
}
