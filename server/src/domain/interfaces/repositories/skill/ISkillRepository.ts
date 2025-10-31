import { Skill } from '../../../entities/skill.entity';

export interface SkillQueryFilters {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedSkills {
  skills: Skill[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ISkillRepository {
  create(name: string): Promise<Skill>;
  findById(id: string): Promise<Skill | null>;
  findByName(name: string): Promise<Skill | null>;
  findAll(filters: SkillQueryFilters): Promise<PaginatedSkills>;
  update(id: string, name: string): Promise<Skill | null>;
  delete(id: string): Promise<boolean>;
}