import { ISkillRepository } from '../../../domain/interfaces/repositories/skill/ISkillRepository';
import { Skill } from '../../../domain/entities/skill.entity';
import { IUpdateSkillUseCase } from '../../../domain/interfaces/use-cases/IAdminUseCases';
import { AppError } from '../../../domain/errors/errors';

export class UpdateSkillUseCase implements IUpdateSkillUseCase {
  constructor(private readonly _skillRepository: ISkillRepository) {}

  async execute(skillId: string, name: string): Promise<Skill> {
    if (!name || !name.trim()) {
      throw new AppError('Skill name is required', 400);
    }

    const normalizedName = name.trim();
    const existingSkill = await this._skillRepository.findById(skillId);
    
    if (!existingSkill) {
      throw new AppError('Skill not found', 404);
    }

    const skillWithSameName = await this._skillRepository.findByName(normalizedName);
    
    if (skillWithSameName && skillWithSameName._id !== skillId) {
      throw new AppError('Skill with this name already exists', 409);
    }

    const updatedSkill = await this._skillRepository.update(skillId, normalizedName);
    
    if (!updatedSkill) {
      throw new AppError('Failed to update skill', 500);
    }

    return updatedSkill;
  }
}