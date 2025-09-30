import { injectable } from 'inversify';
import { ICompanyRepository } from '../../../../domain/repositories';
import {
  CompanyProfile,
  CompanyContact,
  CompanyLocation,
  CompanyVerification,
} from '../../../../domain/entities';
import { CompanyProfileModel } from '../models/company-profile.model';
import { CompanyContactModel } from '../models/company-contact.model';
import { OfficeLocationModel } from '../models/office-location.model';
import { CompanyVerificationModel } from '../models/company-verification.model';
import { Document } from 'mongoose';

interface CompanyProfileDocument extends Document {
  _id: unknown;
  userId: string;
  companyName: string;
  logo: string;
  banner: string;
  websiteLink: string;
  employeeCount: number;
  industry: string;
  organisation: string;
  aboutUs: string;
  isVerified: 'pending' | 'rejected' | 'verified';
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface CompanyContactDocument extends Document {
  _id: unknown;
  companyId: string;
  email: string;
  phone: string;
  twitterLink?: string;
  facebookLink?: string;
  linkedin?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CompanyLocationDocument extends Document {
  _id: unknown;
  companyId: string;
  location: string;
  officeName: string;
  address: string;
  isHeadquarters: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface CompanyVerificationDocument extends Document {
  _id: unknown;
  companyId: string;
  taxId: string;
  businessLicenseUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CompanyQuery {
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
  industry?: string;
  isVerified?: 'pending' | 'rejected' | 'verified';
  isBlocked?: boolean;
}

@injectable()
export class MongoCompanyRepository implements Partial<ICompanyRepository> {
  async createProfile(
    profile: {
      userId: string;
      companyName: string;
      logo: string;
      banner: string;
      websiteLink: string;
      employeeCount: number;
      industry: string;
      organisation: string;
      aboutUs: string;
      isVerified: 'pending' | 'rejected' | 'verified';
      isBlocked: boolean;
    },
  ): Promise<CompanyProfile> {
    const created = await CompanyProfileModel.create(profile);
    return this.mapToProfile(created as CompanyProfileDocument);
  }

  async getProfileByUserId(userId: string): Promise<CompanyProfile | null> {
    const doc = await CompanyProfileModel.findOne({ userId }).exec();
    return doc ? this.mapToProfile(doc as CompanyProfileDocument) : null;
  }

  async getProfileById(profileId: string): Promise<CompanyProfile | null> {
    const doc = await CompanyProfileModel.findById(profileId).exec();
    return doc ? this.mapToProfile(doc as CompanyProfileDocument) : null;
  }

  async updateProfile(
    profileId: string,
    updates: Partial<CompanyProfile>,
  ): Promise<CompanyProfile> {
    console.log('Repository updateProfile called with:', {
      profileId,
      updates
    });
    
    const updated = await CompanyProfileModel.findByIdAndUpdate(
      profileId,
      updates,
      { new: true },
    ).exec();
    
    console.log('MongoDB update result:', {
      found: !!updated,
      logo: updated?.logo,
      aboutUs: updated?.aboutUs
    });
    
    if (!updated) throw new Error('Profile not found');
    return this.mapToProfile(updated as CompanyProfileDocument);
  }

  async createContact(
    contact: Omit<CompanyContact, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<CompanyContact> {
    const created = await CompanyContactModel.create(contact);
    return this.mapToContact(created as CompanyContactDocument);
  }

  async getContactByCompanyId(
    companyId: string,
  ): Promise<CompanyContact | null> {
    const doc = await CompanyContactModel.findOne({ companyId }).exec();
    return doc ? this.mapToContact(doc as CompanyContactDocument) : null;
  }

  async updateContact(
    companyId: string,
    updates: Partial<CompanyContact>,
  ): Promise<CompanyContact> {
    const updated = await CompanyContactModel.findOneAndUpdate(
      { companyId },
      updates,
      { new: true },
    ).exec();
    if (!updated) throw new Error('Contact not found');
    return this.mapToContact(updated as CompanyContactDocument);
  }

  async createLocation(
    location: Omit<CompanyLocation, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<CompanyLocation> {
    const created = await OfficeLocationModel.create(location);
    return this.mapToLocation(created as CompanyLocationDocument);
  }

  async getLocationsByCompanyId(
    companyId: string,
  ): Promise<CompanyLocation[]> {
    const docs = await OfficeLocationModel.find({ companyId }).exec();
    return docs.map((doc) => this.mapToLocation(doc as CompanyLocationDocument));
  }

  async deleteLocations(companyId: string): Promise<void> {
    await OfficeLocationModel.deleteMany({ companyId }).exec();
  }

  async getAllCompanies(options: {
    page: number;
    limit: number;
    search?: string;
    industry?: string;
    isVerified?: 'pending' | 'rejected' | 'verified';
    isBlocked?: boolean;
  }): Promise<{ companies: CompanyProfile[]; total: number }> {
    const { page, limit, search, industry, isVerified, isBlocked } = options;
    
    const query: CompanyQuery = {};
    
    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { industry: { $regex: search, $options: 'i' } },
        { organisation: { $regex: search, $options: 'i' } },
      ];
    }
    
    if (industry) {
      query.industry = industry;
    }
    
    if (isVerified !== undefined) {
      query.isVerified = isVerified;
    }
    
    if (isBlocked !== undefined) {
      query.isBlocked = isBlocked;
    }

    const skip = (page - 1) * limit;
    
    const [companies, total] = await Promise.all([
      CompanyProfileModel.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      CompanyProfileModel.countDocuments(query).exec(),
    ]);

    return {
      companies: companies.map((doc) => this.mapToProfile(doc as CompanyProfileDocument)),
      total,
    };
  }

  async createVerification(
    verification: Omit<CompanyVerification, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<CompanyVerification> {
    const created = await CompanyVerificationModel.create({
      ...verification,
      businessLicenseUrl: verification.businessLicenseUrl || '',
    });
    return this.mapToVerification(created as unknown as CompanyVerificationDocument);
  }

  async getVerificationByCompanyId(
    companyId: string,
  ): Promise<CompanyVerification | null> {
    const doc = await CompanyVerificationModel.findOne({ companyId }).exec();
    return doc ? this.mapToVerification(doc as unknown as CompanyVerificationDocument) : null;
  }

  async updateVerificationStatus(
    companyId: string,
    isVerified: 'pending' | 'rejected' | 'verified',
  ): Promise<void> {
    await CompanyProfileModel.findByIdAndUpdate(
      companyId,
      { isVerified },
    ).exec();
  }

  private mapToProfile(doc: CompanyProfileDocument): CompanyProfile {
    return CompanyProfile.create({
      id: String(doc._id),
      userId: doc.userId,
      companyName: doc.companyName,
      logo: doc.logo,
      banner: doc.banner,
      websiteLink: doc.websiteLink,
      employeeCount: doc.employeeCount,
      industry: doc.industry,
      organisation: doc.organisation,
      aboutUs: doc.aboutUs,
      isVerified: doc.isVerified,
      isBlocked: doc.isBlocked,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  private mapToContact(doc: CompanyContactDocument): CompanyContact {
    return CompanyContact.create({
      id: String(doc._id),
      companyId: doc.companyId,
      email: doc.email,
      phone: doc.phone,
      twitterLink: doc.twitterLink ?? '',
      facebookLink: doc.facebookLink ?? '',
      linkedin: doc.linkedin ?? '',
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  private mapToLocation(doc: CompanyLocationDocument): CompanyLocation {
    return CompanyLocation.create({
      id: String(doc._id),
      companyId: doc.companyId,
      location: doc.location,
      officeName: doc.officeName,
      address: doc.address,
      isHeadquarters: doc.isHeadquarters,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  private mapToVerification(doc: CompanyVerificationDocument): CompanyVerification {
    return CompanyVerification.create({
      id: String(doc._id),
      companyId: doc.companyId,
      taxId: doc.taxId,
      businessLicenseUrl: doc.businessLicenseUrl ?? '',
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
}