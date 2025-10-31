import { ISeekerEducationRepository } from '../../../../domain/interfaces/repositories/seeker/ISeekerEducationRepository';
import { Education } from '../../../../domain/entities/seeker-profile.entity';
import { SeekerEducationModel, SeekerEducationDocument } from '../models/seeker-education.model';
import { Types } from 'mongoose';

export class SeekerEducationRepository implements ISeekerEducationRepository {
  constructor(private readonly model = SeekerEducationModel) {}

  protected mapToEntity(doc: SeekerEducationDocument): Education {
    return {
      id: String(doc._id),
      school: doc.school,
      degree: doc.degree,
      fieldOfStudy: doc.fieldOfStudy,
      startDate: doc.startDate,
      endDate: doc.endDate,
      grade: doc.grade,
    };
  }

  async create(seekerProfileId: string, education: Omit<Education, 'id'>): Promise<Education> {
    const created = await this.model.create({
      seekerProfileId: new Types.ObjectId(seekerProfileId),
      school: education.school,
      degree: education.degree,
      fieldOfStudy: education.fieldOfStudy,
      startDate: education.startDate,
      endDate: education.endDate,
      grade: education.grade,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.mapToEntity(created);
  }

  async findById(educationId: string): Promise<Education | null> {
    const doc = await this.model.findById(educationId).exec();
    return doc ? this.mapToEntity(doc) : null;
  }

  async findBySeekerProfileId(seekerProfileId: string): Promise<Education[]> {
    const docs = await this.model.find({ seekerProfileId: new Types.ObjectId(seekerProfileId) }).sort({ createdAt: -1 }).exec();
    return docs.map(doc => this.mapToEntity(doc));
  }

  async update(educationId: string, updates: Partial<Education>): Promise<Education> {
    const updateData: Record<string, unknown> = { ...updates, updatedAt: new Date() };
    delete updateData.id; 
    
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const updated = await this.model.findByIdAndUpdate(educationId, updateData, { new: true }).exec();
    if (!updated) throw new Error('Education not found');
    return this.mapToEntity(updated);
  }

  async delete(educationId: string): Promise<void> {
    await this.model.findByIdAndDelete(educationId).exec();
  }

  async deleteBySeekerProfileId(seekerProfileId: string): Promise<void> {
    await this.model.deleteMany({ seekerProfileId: new Types.ObjectId(seekerProfileId) }).exec();
  }
}