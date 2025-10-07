import { CompanyProfile } from '../../../../domain/entities';
import { Document } from 'mongoose';

export interface CompanyProfileDocument extends Document {
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

export class CompanyProfileMapper {
  static toEntity(doc: CompanyProfileDocument): CompanyProfile {
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
}
