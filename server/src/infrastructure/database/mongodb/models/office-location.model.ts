import { Schema, model, Document } from 'mongoose';

export interface OfficeLocationDocument extends Document {
  companyId: string;
  location: string;
  officeName: string;
  address: string;
  isHeadquarters: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const OfficeLocationSchema = new Schema<OfficeLocationDocument>(
  {
    companyId: { type: String, required: true, ref: 'CompanyProfile' },
    location: { type: String, required: true },
    officeName: { type: String, required: true },
    address: { type: String, required: true },
    isHeadquarters: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const OfficeLocationModel = model<OfficeLocationDocument>(
  'OfficeLocation',
  OfficeLocationSchema,
);
