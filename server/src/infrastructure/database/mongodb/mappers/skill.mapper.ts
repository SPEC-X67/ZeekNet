import { Skill } from '../../../../domain/entities/skill.entity';
import { Document } from 'mongoose';

export interface SkillDocument extends Document {
  _id: unknown;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class SkillMapper {
  static toEntity(doc: SkillDocument): Skill {
    return {
      _id: String(doc._id),
      name: doc.name,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
