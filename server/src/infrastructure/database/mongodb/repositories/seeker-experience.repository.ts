import { ISeekerExperienceRepository } from '../../../../domain/interfaces/repositories/seeker/ISeekerExperienceRepository';
import { Experience } from '../../../../domain/entities/seeker-profile.entity';
import { SeekerExperienceModel, SeekerExperienceDocument } from '../models/seeker-experience.model';
import { Types } from 'mongoose';

export class SeekerExperienceRepository implements ISeekerExperienceRepository {
  constructor(private readonly model = SeekerExperienceModel) {}

  protected mapToEntity(doc: SeekerExperienceDocument): Experience {
    return {
      id: String(doc._id),
      title: doc.title,
      company: doc.company,
      startDate: doc.startDate,
      endDate: doc.endDate,
      employmentType: doc.employmentType,
      location: doc.location,
      description: doc.description,
      technologies: doc.technologies || [],
      isCurrent: doc.isCurrent,
    };
  }

  async create(seekerProfileId: string, experience: Omit<Experience, 'id'>): Promise<Experience> {
    const created = await this.model.create({
      seekerProfileId: new Types.ObjectId(seekerProfileId),
      title: experience.title,
      company: experience.company,
      startDate: experience.startDate,
      endDate: experience.endDate,
      employmentType: experience.employmentType,
      location: experience.location,
      description: experience.description,
      technologies: experience.technologies || [],
      isCurrent: experience.isCurrent || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.mapToEntity(created);
  }

  async findById(experienceId: string): Promise<Experience | null> {
    const doc = await this.model.findById(experienceId).exec();
    return doc ? this.mapToEntity(doc) : null;
  }

  async findBySeekerProfileId(seekerProfileId: string): Promise<Experience[]> {
    const docs = await this.model.find({ seekerProfileId: new Types.ObjectId(seekerProfileId) }).sort({ createdAt: -1 }).exec();
    return docs.map(doc => this.mapToEntity(doc));
  }

  async update(experienceId: string, updates: Partial<Experience>): Promise<Experience> {
    const updateData: Record<string, unknown> = { ...updates, updatedAt: new Date() };
    delete updateData.id; // Don't update the id
    
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const updated = await this.model.findByIdAndUpdate(experienceId, updateData, { new: true }).exec();
    if (!updated) throw new Error('Experience not found');
    return this.mapToEntity(updated);
  }

  async delete(experienceId: string): Promise<void> {
    await this.model.findByIdAndDelete(experienceId).exec();
  }

  async deleteBySeekerProfileId(seekerProfileId: string): Promise<void> {
    await this.model.deleteMany({ seekerProfileId: new Types.ObjectId(seekerProfileId) }).exec();
  }
}
