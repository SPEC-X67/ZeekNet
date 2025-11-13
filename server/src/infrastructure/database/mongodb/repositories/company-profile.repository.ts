import { ICompanyProfileRepository } from '../../../../domain/interfaces/repositories/company/ICompanyProfileRepository';
import { CompanyProfile } from '../../../../domain/entities/company-profile.entity';
import { CompanyProfileModel, CompanyProfileDocument as ModelDocument } from '../models/company-profile.model';
import { CompanyProfileMapper, CompanyProfileDocument } from '../mappers/company-profile.mapper';
import { RepositoryBase } from './base-repository';

export class CompanyProfileRepository extends RepositoryBase<CompanyProfile, CompanyProfileDocument> implements ICompanyProfileRepository {
  constructor() {
    super(CompanyProfileModel);
  }

  protected mapToEntity(doc: ModelDocument): CompanyProfile {
    return CompanyProfileMapper.toEntity(doc as unknown as CompanyProfileDocument);
  }

  async createProfile(profile: { userId: string; companyName: string; logo: string; banner: string; websiteLink: string; employeeCount: number; industry: string; organisation: string; aboutUs: string; isVerified: 'pending' | 'rejected' | 'verified' }): Promise<CompanyProfile> {
    const created = await this.model.create({ ...profile, createdAt: new Date(), updatedAt: new Date() });
    return this.mapToEntity(created);
  }

  async getProfileByUserId(userId: string): Promise<CompanyProfile | null> {
    const doc = await this.model.findOne({ userId }).exec();
    return doc ? this.mapToEntity(doc) : null;
  }

  async getProfileById(profileId: string): Promise<CompanyProfile | null> {
    const doc = await this.model.findById(profileId).exec();
    return doc ? this.mapToEntity(doc) : null;
  }

  async updateProfile(profileId: string, updates: Partial<CompanyProfile>): Promise<CompanyProfile> {
    const updated = await this.model.findByIdAndUpdate(profileId, { ...updates, updatedAt: new Date() }, { new: true }).exec();

    if (!updated) throw new Error('Profile not found');
    return this.mapToEntity(updated);
  }

  async deleteProfile(profileId: string): Promise<void> {
    await super.delete(profileId);
  }

  async existsByUserId(userId: string): Promise<boolean> {
    return await this.exists({ userId });
  }
}