import { JobPostingRepository } from '../../../../domain/repositories/job-posting.repository.interface';
import { JobPosting, CreateJobPostingRequest, UpdateJobPostingRequest, JobPostingFilters, PaginatedJobPostings } from '../../../../domain/entities/job-posting.entity';
import { JobPostingModel, JobPostingDocument } from '../models/job-posting.model';
import { Types } from 'mongoose';

interface MongoQuery {
  [key: string]: unknown;
  'salary.min'?: {
    $gte?: number;
  };
  'salary.max'?: {
    $lte?: number;
  };
  $or?: Array<{ [key: string]: unknown }>;
}

interface MongoUpdateData {
  [key: string]: unknown;
  company_id?: string | Types.ObjectId;
  skills_required?: string[];
  category_ids?: string[];
}

export class MongoJobPostingRepository implements JobPostingRepository {
  constructor() {}

  private mapDocumentToEntity(doc: JobPostingDocument): JobPosting {
    return {
      _id: doc._id ? doc._id.toString() : '',
      company_id: doc.company_id ? doc.company_id.toString() : '',
      title: doc.title || '',
      description: doc.description || '',
      responsibilities: doc.responsibilities || [],
      qualifications: doc.qualifications || [],
      nice_to_haves: doc.nice_to_haves || [],
      benefits: doc.benefits || [],
      salary: doc.salary || { min: 0, max: 0 },
      employment_types: doc.employment_types || [],
      location: doc.location || '',
      skills_required: doc.skills_required || [],
      category_ids: doc.category_ids || [],
      is_active: doc.is_active !== undefined ? doc.is_active : true,
      view_count: doc.view_count || 0,
      application_count: doc.application_count || 0,
      createdAt: doc.createdAt || new Date(),
      updatedAt: doc.updatedAt || new Date(),
    };
  }

  async create(data: CreateJobPostingRequest): Promise<JobPosting> {
    try {
      const jobPostingData = {
        ...data,
        company_id: new Types.ObjectId(data.company_id),
        skills_required: data.skills_required,
        category_ids: data.category_ids, // Now storing as strings
        view_count: 0,
        application_count: 0,
        is_active: true,
      };

      const jobPosting = new JobPostingModel(jobPostingData);
      const savedJobPosting = await jobPosting.save();
      
      return this.mapDocumentToEntity(savedJobPosting);
    } catch (error) {
      console.error('MongoJobPostingRepository.create error:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<JobPosting | null> {
    const jobPosting = await JobPostingModel.findById(id)
      .populate('company_id', 'companyName logo');
    
    return jobPosting ? this.mapDocumentToEntity(jobPosting) : null;
  }

  async findByCompanyId(companyId: string, filters?: JobPostingFilters): Promise<PaginatedJobPostings> {
    const query: MongoQuery = { company_id: new Types.ObjectId(companyId) };
    
    if (filters) {
      this.applyFilters(query, filters);
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const skip = (page - 1) * limit;

    const [jobs, total] = await Promise.all([
      JobPostingModel.find(query)
        .populate('company_id', 'companyName logo')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      JobPostingModel.countDocuments(query),
    ]);

    return {
      jobs: jobs.map(job => this.mapDocumentToEntity(job)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findAll(filters?: JobPostingFilters): Promise<PaginatedJobPostings> {
    const query: MongoQuery = {};
    
    if (filters) {
      this.applyFilters(query, filters);
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const skip = (page - 1) * limit;

    const [jobs, total] = await Promise.all([
      JobPostingModel.find(query)
        .populate('company_id', 'companyName logo')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      JobPostingModel.countDocuments(query),
    ]);

    return {
      jobs: jobs.map(job => this.mapDocumentToEntity(job)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async update(id: string, data: UpdateJobPostingRequest): Promise<JobPosting | null> {
    const updateData: MongoUpdateData = { ...data };

    if (data.company_id) updateData.company_id = new Types.ObjectId(data.company_id);
    if (data.skills_required) updateData.skills_required = data.skills_required;
    if (data.category_ids) updateData.category_ids = data.category_ids;

    const result = await JobPostingModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true },
    )
      .populate('company_id', 'companyName logo')
      .populate('skills_required', 'name')
      .populate('category_ids', 'name');

    return result ? this.mapDocumentToEntity(result) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await JobPostingModel.findByIdAndDelete(id);
    return !!result;
  }

  async incrementViewCount(id: string): Promise<void> {
    await JobPostingModel.findByIdAndUpdate(
      id,
      { $inc: { view_count: 1 } },
    );
  }

  async incrementApplicationCount(id: string): Promise<void> {
    await JobPostingModel.findByIdAndUpdate(
      id,
      { $inc: { application_count: 1 } },
    );
  }

  async updateJobStatus(id: string, status: string): Promise<JobPosting | null> {
    const result = await JobPostingModel.findByIdAndUpdate(
      id,
      { 
        is_active: status === 'active',
        updatedAt: new Date(),
      },
      { new: true },
    )
      .populate('company_id', 'companyName logo')
      .populate('skills_required', 'name')
      .populate('category_ids', 'name');

    return result ? this.mapDocumentToEntity(result) : null;
  }

  private applyFilters(query: MongoQuery, filters: JobPostingFilters): void {
    if (filters.is_active !== undefined) {
      query.is_active = filters.is_active;
    }

    if (filters.category_ids && filters.category_ids.length > 0) {
      query.category_ids = { $in: filters.category_ids };
    }

    if (filters.employment_types && filters.employment_types.length > 0) {
      query.employment_types = { $in: filters.employment_types };
    }

    if (filters.salary_min !== undefined || filters.salary_max !== undefined) {
      query['salary.min'] = {};
      query['salary.max'] = {};
      
      if (filters.salary_min !== undefined) {
        query['salary.min'].$gte = filters.salary_min;
      }
      
      if (filters.salary_max !== undefined) {
        query['salary.max'].$lte = filters.salary_max;
      }
    }

    if (filters.company_id) {
      query.company_id = new Types.ObjectId(filters.company_id);
    }

    if (filters.location) {
      query.location = { $regex: filters.location, $options: 'i' };
    }

    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } },
        { location: { $regex: filters.search, $options: 'i' } },
      ];
    }
  }
}

