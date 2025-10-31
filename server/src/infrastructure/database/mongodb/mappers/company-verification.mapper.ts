import { CompanyVerification } from '../../../../domain/entities/company-profile.entity';
import { Document } from 'mongoose';

export interface CompanyVerificationDocument extends Document {
  _id: unknown;
  companyId: string;
  taxId: string;
  businessLicenseUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class CompanyVerificationMapper {
  static toEntity(doc: CompanyVerificationDocument): CompanyVerification {
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