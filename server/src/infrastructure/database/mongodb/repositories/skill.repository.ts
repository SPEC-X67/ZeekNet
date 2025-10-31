import { ISkillRepository, PaginatedSkills, SkillQueryFilters } from '../../../../domain/interfaces/repositories/skill/ISkillRepository';
import { Skill } from '../../../../domain/entities/skill.entity';
import { SkillModel, SkillDocument } from '../models/skill.model';
import { Types } from 'mongoose';

export class SkillRepository implements ISkillRepository {
  protected model = SkillModel;

  protected mapToEntity(document: SkillDocument): Skill {
    return {
      _id: String(document._id),
      name: document.name,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  async create(name: string): Promise<Skill> {
    const document = await this.model.create({
      name: name.trim(),
    });
    return this.mapToEntity(document);
  }

  async findById(id: string): Promise<Skill | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const document = await this.model.findById(id);
    if (!document) {
      return null;
    }
    return this.mapToEntity(document);
  }

  async findByName(name: string): Promise<Skill | null> {
    const document = await this.model.findOne({ name: name.trim() });
    if (!document) {
      return null;
    }
    return this.mapToEntity(document);
  }

  async findAll(filters: SkillQueryFilters): Promise<PaginatedSkills> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = {};

    if (filters.search) {
      query.name = { $regex: filters.search, $options: 'i' };
    }

    const sortBy = filters.sortBy || 'createdAt';
    const sortOrder = filters.sortOrder === 'asc' ? 1 : -1;
    const sort: Record<string, 1 | -1> = { [sortBy]: sortOrder };

    const [documents, total] = await Promise.all([
      this.model.find(query).sort(sort).skip(skip).limit(limit),
      this.model.countDocuments(query),
    ]);

    const skills = documents.map((doc) => this.mapToEntity(doc));
    const totalPages = Math.ceil(total / limit);

    return {
      skills,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async update(id: string, name: string): Promise<Skill | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const document = await this.model.findByIdAndUpdate(
      id,
      { name: name.trim() },
      { new: true, runValidators: true },
    );

    if (!document) {
      return null;
    }

    return this.mapToEntity(document);
  }

  async delete(id: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(id)) {
      return false;
    }

    const result = await this.model.findByIdAndDelete(id);
    return result !== null;
  }
}