import { Experience } from '../../../entities/seeker-profile.entity';

export interface ISeekerExperienceRepository {
  create(seekerProfileId: string, experience: Omit<Experience, 'id'>): Promise<Experience>;
  findById(experienceId: string): Promise<Experience | null>;
  findBySeekerProfileId(seekerProfileId: string): Promise<Experience[]>;
  update(experienceId: string, updates: Partial<Experience>): Promise<Experience>;
  delete(experienceId: string): Promise<void>;
  deleteBySeekerProfileId(seekerProfileId: string): Promise<void>;
}
