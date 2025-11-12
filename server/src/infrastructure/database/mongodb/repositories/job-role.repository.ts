import { IJobRoleRepository, PaginatedJobRoles, JobRoleQueryFilters } from '../../../../domain/interfaces/repositories/job-role/IJobRoleRepository';
import { JobRole } from '../../../../domain/entities/job-role.entity';
import { JobRoleModel, JobRoleDocument } from '../models/job-role.model';
import { Types } from 'mongoose';

export class JobRoleRepository implements IJobRoleRepository {
  protected model = JobRoleModel;

  protected mapToEntity(document: JobRoleDocument): JobRole {
    return {
      _id: String(document._id),
      name: document.name,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  async create(name: string): Promise<JobRole> {
    const document = await this.model.create({
      name: name.trim(),
    });
    return this.mapToEntity(document);
  }

  async findById(id: string): Promise<JobRole | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const document = await this.model.findById(id);
    if (!document) {
      return null;
    }
    return this.mapToEntity(document);
  }

  async findByName(name: string): Promise<JobRole | null> {
    // Case-insensitive search - escape special regex characters
    const escapedName = name.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const document = await this.model.findOne({ 
      name: { $regex: new RegExp(`^${escapedName}$`, 'i') } 
    });
    if (!document) {
      return null;
    }
    return this.mapToEntity(document);
  }

  async findAll(filters: JobRoleQueryFilters): Promise<PaginatedJobRoles> {
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

    const jobRoles = documents.map((doc) => this.mapToEntity(doc));
    const totalPages = Math.ceil(total / limit);

    return {
      jobRoles,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async update(id: string, name: string): Promise<JobRole | null> {
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

