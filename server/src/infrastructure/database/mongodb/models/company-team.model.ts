import { Schema, model, Document } from 'mongoose';

import { Types } from 'mongoose';

export interface CompanyTeamDocument extends Document {
  companyId: Types.ObjectId;
  name: string;
  role: string;
  avatar?: string;
  instagram?: string;
  linkedin?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CompanyTeamSchema = new Schema<CompanyTeamDocument>({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'CompanyProfile',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  instagram: {
    type: String,
  },
  linkedin: {
    type: String,
  },
}, {
  timestamps: true,
});

export const CompanyTeamModel = model<CompanyTeamDocument>('CompanyTeam', CompanyTeamSchema);
