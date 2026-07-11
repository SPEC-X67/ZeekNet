import { CreateSkillRequestDto, SkillResponseDto } from 'src/application/dtos/admin/attributes/skills/skill.dto';

export interface ICreateSkillUseCase {
  execute(dto: CreateSkillRequestDto): Promise<SkillResponseDto>;
}
