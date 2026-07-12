import { UpdateSkillRequestDto, SkillResponseDto } from 'src/application/dtos/skill.dto';

export interface IUpdateSkillUseCase {
  execute(skillId: string, dto: UpdateSkillRequestDto): Promise<SkillResponseDto>;
}
