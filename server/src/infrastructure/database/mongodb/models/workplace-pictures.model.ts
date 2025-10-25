import { Schema, model, Document } from 'mongoose';

export interface WorkplacePicturesDocument extends Document {
  companyId: string;
  pictureUrl: string;
  caption: string;
  createdAt: Date;
  updatedAt: Date;
}

const WorkplacePicturesSchema = new Schema<WorkplacePicturesDocument>(
  {
    companyId: { type: String, required: true, ref: 'CompanyProfile' },
    pictureUrl: { type: String, required: true },
    caption: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export const WorkplacePicturesModel = model<WorkplacePicturesDocument>('WorkplacePictures', WorkplacePicturesSchema);
