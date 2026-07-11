import { UpdateSkillRequestDto, SkillResponseDto } from 'src/application/dtos/admin/skill.dto';

export interface IUpdateSkillUseCase {
  execute(skillId: string, dto: UpdateSkillRequestDto): Promise<SkillResponseDto>;
}
