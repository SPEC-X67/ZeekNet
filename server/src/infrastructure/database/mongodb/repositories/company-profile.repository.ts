import { ICompanyProfileRepository } from '../../../../domain/interfaces/repositories';
import { CompanyProfile } from '../../../../domain/entities';
import { CompanyProfileModel } from '../models/company-profile.model';
import { CompanyProfileDocument, CompanyProfileMapper } from '../mappers';

export class CompanyProfileRepository implements ICompanyProfileRepository {
  async createProfile(profile: { userId: string; companyName: string; logo: string; banner: string; websiteLink: string; employeeCount: number; industry: string; organisation: string; aboutUs: string; isVerified: 'pending' | 'rejected' | 'verified'; isBlocked: boolean }): Promise<CompanyProfile> {
    const created = await CompanyProfileModel.create(profile);
    return CompanyProfileMapper.toEntity(created as CompanyProfileDocument);
  }

  async getProfileByUserId(userId: string): Promise<CompanyProfile | null> {
    const doc = await CompanyProfileModel.findOne({ userId }).exec();
    return doc ? CompanyProfileMapper.toEntity(doc as CompanyProfileDocument) : null;
  }

  async getProfileById(profileId: string): Promise<CompanyProfile | null> {
    const doc = await CompanyProfileModel.findById(profileId).exec();
    return doc ? CompanyProfileMapper.toEntity(doc as CompanyProfileDocument) : null;
  }

  async updateProfile(profileId: string, updates: Partial<CompanyProfile>): Promise<CompanyProfile> {
    const updated = await CompanyProfileModel.findByIdAndUpdate(profileId, updates, { new: true }).exec();

    if (!updated) throw new Error('Profile not found');
    return CompanyProfileMapper.toEntity(updated as CompanyProfileDocument);
  }

  async deleteProfile(profileId: string): Promise<void> {
    await CompanyProfileModel.findByIdAndDelete(profileId).exec();
  }

  async existsByUserId(userId: string): Promise<boolean> {
    const count = await CompanyProfileModel.countDocuments({ userId }).exec();
    return count > 0;
  }
}
