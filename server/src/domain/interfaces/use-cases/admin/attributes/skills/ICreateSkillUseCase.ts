import { CreateSkillRequestDto, SkillResponseDto } from 'src/application/dtos/skill.dto';

export interface ICreateSkillUseCase {
  execute(dto: CreateSkillRequestDto): Promise<SkillResponseDto>;
}
