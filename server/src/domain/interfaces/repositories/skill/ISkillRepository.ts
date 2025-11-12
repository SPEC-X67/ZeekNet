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
  findById(id: string): Promise<Skill | null>;
  findByName(name: string): Promise<Skill | null>;
  create(data: { name: string }): Promise<Skill>;
  update(id: string, updates: { name: string }): Promise<Skill | null>;
  delete(id: string): Promise<boolean>;
  count(): Promise<number>;
  findAllWithPagination(filters?: SkillQueryFilters): Promise<PaginatedSkills>;
}