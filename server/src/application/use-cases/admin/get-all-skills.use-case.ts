import { ISkillRepository, SkillQueryFilters, PaginatedSkills } from '../../../domain/interfaces/repositories/skill/ISkillRepository';
import { IGetAllSkillsUseCase } from '../../../domain/interfaces/use-cases/IAdminUseCases';

export class GetAllSkillsUseCase implements IGetAllSkillsUseCase {
  constructor(private readonly _skillRepository: ISkillRepository) {}

  async execute(filters: SkillQueryFilters): Promise<PaginatedSkills> {
    return await this._skillRepository.findAll(filters);
  }
}