import { Education } from '../../../entities/seeker-profile.entity';

export interface ISeekerEducationRepository {
  create(seekerProfileId: string, education: Omit<Education, 'id'>): Promise<Education>;
  findById(educationId: string): Promise<Education | null>;
  findBySeekerProfileId(seekerProfileId: string): Promise<Education[]>;
  update(educationId: string, updates: Partial<Education>): Promise<Education>;
  delete(educationId: string): Promise<void>;
  deleteBySeekerProfileId(seekerProfileId: string): Promise<void>;
}