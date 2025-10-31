import { JobCategory } from '../../../../domain/entities/job-category.entity';
import { Document } from 'mongoose';

export interface JobCategoryDocument extends Document {
  _id: unknown;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class JobCategoryMapper {
  static toEntity(doc: JobCategoryDocument): JobCategory {
    return new JobCategory(
      String(doc._id),
      doc.name,
      doc.createdAt,
      doc.updatedAt,
    );
  }
}