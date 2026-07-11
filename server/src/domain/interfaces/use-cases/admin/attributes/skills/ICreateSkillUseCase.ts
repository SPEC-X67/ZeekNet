import { CreateSkillRequestDto, SkillResponseDto } from 'src/application/dtos/admin/skill.dto';

export interface ICreateSkillUseCase {
  execute(dto: CreateSkillRequestDto): Promise<SkillResponseDto>;
}
