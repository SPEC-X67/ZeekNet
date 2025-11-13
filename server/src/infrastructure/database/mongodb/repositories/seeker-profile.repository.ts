import { ISeekerProfileRepository } from '../../../../domain/interfaces/repositories/seeker/ISeekerProfileRepository';
import { SeekerProfile, ResumeMeta, SocialLink } from '../../../../domain/entities/seeker-profile.entity';
import { SeekerProfileModel, SeekerProfileDocument as ModelDocument } from '../models/seeker-profile.model';
import { RepositoryBase } from './base-repository';
import { Types } from 'mongoose';

export class SeekerProfileRepository extends RepositoryBase<SeekerProfile, ModelDocument> implements ISeekerProfileRepository {
  constructor() {
    super(SeekerProfileModel);
  }

  protected mapToEntity(doc: ModelDocument): SeekerProfile {
    return SeekerProfile.create({
      id: String(doc._id),
      userId: String(doc.userId),
      headline: doc.headline || undefined,
      summary: doc.summary || undefined,
      location: doc.location || undefined,
      phone: doc.phone || undefined,
      email: doc.email || null,
      avatarFileName: doc.avatarFileName || null,
      bannerFileName: doc.bannerFileName || null,
      dateOfBirth: doc.dateOfBirth || null,
      gender: doc.gender || null,
      skills: doc.skills || [],
      languages: doc.languages || [],
      socialLinks: doc.socialLinks || [],
      resume: doc.resume ? {
        url: doc.resume.url,
        fileName: doc.resume.fileName,
        uploadedAt: doc.resume.uploadedAt,
      } : undefined,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  async createProfile(profile: {
    userId: string;
    headline?: string;
    summary?: string;
    location?: string;
    phone?: string;
    email?: string;
    avatarFileName?: string | null;
    bannerFileName?: string | null;
    dateOfBirth?: Date | null;
    gender?: string | null;
    skills?: string[];
    languages?: string[];
    socialLinks?: SocialLink[];
  }): Promise<SeekerProfile> {
    const created = await this.model.create({
      userId: new Types.ObjectId(profile.userId),
      headline: profile.headline,
      summary: profile.summary,
      location: profile.location,
      phone: profile.phone,
      email: profile.email || undefined, 
      avatarFileName: profile.avatarFileName || undefined,
      bannerFileName: profile.bannerFileName || undefined,
      dateOfBirth: profile.dateOfBirth || undefined,
      gender: profile.gender || undefined,
      skills: profile.skills || [],
      languages: profile.languages || [],
      socialLinks: profile.socialLinks || [],
      resume: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.mapToEntity(created);
  }

  async getProfileByUserId(userId: string): Promise<SeekerProfile | null> {
    const doc = await this.model.findOne({ userId: new Types.ObjectId(userId) }).exec();
    return doc ? this.mapToEntity(doc) : null;
  }

  async getProfileById(profileId: string): Promise<SeekerProfile | null> {
    const doc = await this.model.findById(profileId).exec();
    return doc ? this.mapToEntity(doc) : null;
  }

  async updateProfile(profileId: string, updates: Partial<SeekerProfile>): Promise<SeekerProfile> {
    const updateData: Record<string, unknown> = { ...updates, updatedAt: new Date() };

    if (updateData.userId) {
      updateData.userId = new Types.ObjectId(updateData.userId as string);
    }
    
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const updated = await this.model.findByIdAndUpdate(profileId, updateData, { new: true }).exec();
    if (!updated) throw new Error('Profile not found');
    return this.mapToEntity(updated);
  }

  async deleteProfile(profileId: string): Promise<void> {
    await super.delete(profileId);
  }

  async existsByUserId(userId: string): Promise<boolean> {
    return await this.exists({ userId: new Types.ObjectId(userId) });
  }

  async updateSkills(userId: string, skills: string[]): Promise<string[]> {
    await this.model.updateOne(
      { userId: new Types.ObjectId(userId) },
      {
        $set: {
          skills,
          updatedAt: new Date(),
        },
      },
    ).exec();
    return skills;
  }

  async updateLanguages(userId: string, languages: string[]): Promise<string[]> {
    await this.model.updateOne(
      { userId: new Types.ObjectId(userId) },
      {
        $set: {
          languages,
          updatedAt: new Date(),
        },
      },
    ).exec();
    return languages;
  }

  async updateSocialLinks(userId: string, socialLinks: SocialLink[]): Promise<SocialLink[]> {
    await this.model.updateOne(
      { userId: new Types.ObjectId(userId) },
      { 
        $set: { 
          socialLinks,
          updatedAt: new Date(),
        },
      },
    ).exec();
    return socialLinks;
  }

  async updateResume(userId: string, resume: ResumeMeta): Promise<ResumeMeta> {
    await this.model.updateOne(
      { userId: new Types.ObjectId(userId) },
      { 
        $set: { 
          resume,
          updatedAt: new Date(),
        },
      },
    ).exec();
    return resume;
  }

  async removeResume(userId: string): Promise<void> {
    await this.model.updateOne(
      { userId: new Types.ObjectId(userId) },
      { 
        $unset: { resume: 1 },
        $set: { updatedAt: new Date() },
      },
    ).exec();
  }
}