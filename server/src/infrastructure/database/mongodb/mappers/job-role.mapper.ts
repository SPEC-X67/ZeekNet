import { JobRole } from '../../../../domain/entities/job-role.entity';
import { Document } from 'mongoose';

export interface JobRoleDocument extends Document {
  _id: unknown;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class JobRoleMapper {
  static toEntity(doc: JobRoleDocument): JobRole {
    return {
      _id: String(doc._id),
      name: doc.name,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
