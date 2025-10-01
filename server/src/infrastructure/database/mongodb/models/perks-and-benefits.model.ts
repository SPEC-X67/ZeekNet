import { Schema, model, Document } from 'mongoose';

export interface PerksAndBenefitsDocument extends Document {
  companyId: string;
  perk: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const PerksAndBenefitsSchema = new Schema<PerksAndBenefitsDocument>(
  {
    companyId: { type: String, required: true, ref: 'CompanyProfile' },
    perk: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const PerksAndBenefitsModel = model<PerksAndBenefitsDocument>(
  'PerksAndBenefits',
  PerksAndBenefitsSchema,
);

