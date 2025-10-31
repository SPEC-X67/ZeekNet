import { ISeekerProfileRepository } from '../../../domain/interfaces/repositories/seeker/ISeekerProfileRepository';
import { IUpdateSkillsUseCase } from '../../../domain/interfaces/use-cases/ISeekerUseCases';
import { NotFoundError } from '../../../domain/errors/errors';

export class UpdateSkillsUseCase implements IUpdateSkillsUseCase {
  constructor(
    private readonly _seekerProfileRepository: ISeekerProfileRepository,
  ) {}

  async execute(userId: string, skills: string[]): Promise<string[]> {
    
    const profile = await this._seekerProfileRepository.getProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundError('Seeker profile not found');
    }

    const uniqueSkills = [...new Set(skills.filter(skill => skill.trim().length > 0))];

    const updatedSkills = await this._seekerProfileRepository.updateSkills(userId, uniqueSkills);
    return updatedSkills;
  }
}