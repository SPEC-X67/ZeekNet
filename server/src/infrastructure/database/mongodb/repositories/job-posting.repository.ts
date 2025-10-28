import { IJobPostingRepository, IJobPostingSearchRepository, IJobPostingAnalyticsRepository, IJobPostingManagementRepository } from '../../../../domain/interfaces/repositories';
import { JobPosting, CreateJobPostingRequest, UpdateJobPostingRequest, JobPostingFilters, PaginatedJobPostings } from '../../../../domain/entities/job-posting.entity';
import { JobPostingModel, JobPostingDocument } from '../models/job-posting.model';
import { Types } from 'mongoose';
import { JobPostingMapper } from '../mappers';
import { JobPostingResponseDto } from '../../../../application/dto/job-posting/job-posting-response.dto';
import { RepositoryBase } from './base-repository';

export interface JobPostingDetailResponseDto {
  id: string;
  title: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  nice_to_haves: string[];
  benefits: string[];
  salary: { min: number; max: number };
  employment_types: string[];
  location: string;
  skills_required: string[];
  category_ids: string[];
  is_active: boolean;
  view_count: number;
  application_count: number;
  createdAt: string;
  updatedAt: string;
  company: {
    companyName: string;
    logo: string;
    workplacePictures: Array<{
      pictureUrl: string;
      caption?: string;
    }>;
  };
}

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

export class JobPostingRepository extends RepositoryBase<JobPosting, JobPostingDocument> implements IJobPostingRepository, IJobPostingSearchRepository, IJobPostingAnalyticsRepository, IJobPostingManagementRepository {
  constructor() {
    super(JobPostingModel);
  }

  protected mapToEntity(doc: JobPostingDocument): JobPosting {
    return JobPostingMapper.toEntity(doc);
  }

  private mapDocumentToClientResponse(doc: JobPostingDocument): JobPostingResponseDto {
    return JobPostingMapper.toClientResponse(doc);
  }

  async create(data: CreateJobPostingRequest): Promise<JobPosting> {
    try {
      const jobPostingData = {
        ...data,
        company_id: new Types.ObjectId(data.company_id),
        skills_required: data.skills_required,
        category_ids: data.category_ids,
        view_count: 0,
        application_count: 0,
        is_active: true,
      };

      const jobPosting = new JobPostingModel(jobPostingData);

      
      

      
      

      
      
      
      

      
      
      

      const savedJobPosting = await jobPosting.save();

      return this.mapToEntity(savedJobPosting);
    } catch (error) {
      console.error('JobPostingRepository.create error:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<JobPosting | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const jobPosting = await JobPostingModel.findById(id).populate('company_id', 'companyName logo');

    return jobPosting ? this.mapToEntity(jobPosting) : null;
  }

  async findByIdForClient(id: string): Promise<JobPostingDetailResponseDto | null> {
    const jobPosting = await JobPostingModel.findById(id).populate('company_id', 'companyName logo');

    if (!jobPosting) {
      return null;
    }

    const populatedDoc = jobPosting as unknown as { company_id?: { companyName?: string; logo?: string; _id?: unknown } };

    let company = null;
    if (populatedDoc.company_id && typeof populatedDoc.company_id === 'object') {
      const { CompanyWorkplacePicturesModel } = await import('../models/company-workplace-pictures.model');
      const workplacePictures = await CompanyWorkplacePicturesModel.find({
        companyId: populatedDoc.company_id._id,
      })
        .select('pictureUrl caption')
        .limit(4);

      company = {
        companyName: populatedDoc.company_id.companyName || 'Unknown Company',
        logo: populatedDoc.company_id.logo || '/white.png',
        workplacePictures: workplacePictures.map((pic) => ({
          pictureUrl: pic.pictureUrl,
          caption: pic.caption,
        })),
      };
    } else {
      company = {
        companyName: 'ZeekNet Company',
        logo: '/white.png',
        workplacePictures: [],
      };
    }

    return {
      id: jobPosting._id.toString(),
      title: jobPosting.title,
      description: jobPosting.description,
      responsibilities: jobPosting.responsibilities,
      qualifications: jobPosting.qualifications,
      nice_to_haves: jobPosting.nice_to_haves,
      benefits: jobPosting.benefits,
      salary: {
        min: jobPosting.salary.min,
        max: jobPosting.salary.max,
      },
      employment_types: jobPosting.employment_types,
      location: jobPosting.location,
      skills_required: jobPosting.skills_required,
      category_ids: jobPosting.category_ids,
      is_active: jobPosting.is_active,
      view_count: jobPosting.view_count,
      application_count: jobPosting.application_count,
      createdAt: jobPosting.createdAt.toISOString(),
      updatedAt: jobPosting.updatedAt.toISOString(),
      company: company,
    };
  }

  async findByCompanyId(companyId: string, filters?: JobPostingFilters): Promise<PaginatedJobPostings> {
    if (!companyId || companyId === 'undefined') {
      throw new Error('Company ID is required and cannot be undefined');
    }

    const query: MongoQuery = { company_id: new Types.ObjectId(companyId) };

    if (filters) {
      this.applyFilters(query, filters);
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const skip = (page - 1) * limit;

    const [jobs, total] = await Promise.all([
      JobPostingModel.find(query).select('_id title description location employment_types salary is_active application_count view_count createdAt updatedAt').populate('company_id', 'companyName logo').skip(skip).limit(limit).sort({ createdAt: -1 }),
      JobPostingModel.countDocuments(query),
    ]);

    return {
      jobs: jobs.map((job) => this.mapToEntity(job)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findAll(filters?: JobPostingFilters): Promise<JobPosting[]>;
  async findAll(filters: JobPostingFilters): Promise<PaginatedJobPostings>;
  async findAll(filters?: JobPostingFilters): Promise<JobPosting[] | PaginatedJobPostings> {
    const query: MongoQuery = {};

    if (filters) {
      this.applyFilters(query, filters);
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const skip = (page - 1) * limit;

    const [jobs, total] = await Promise.all([JobPostingModel.find(query).select('_id title company_id salary employment_types location category_ids createdAt').populate('company_id', 'companyName logo').skip(skip).limit(limit).sort({ createdAt: -1 }), JobPostingModel.countDocuments(query)]);

    return {
      jobs: jobs.map((job) => this.mapToEntity(job)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async update(id: string, data: UpdateJobPostingRequest): Promise<JobPosting | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const updateData: MongoUpdateData = { ...data, updatedAt: new Date() };

    if (data.company_id) updateData.company_id = new Types.ObjectId(data.company_id);
    if (data.skills_required) updateData.skills_required = data.skills_required;
    if (data.category_ids) updateData.category_ids = data.category_ids;

    const result = await JobPostingModel.findByIdAndUpdate(id, updateData, { new: true }).populate('company_id', 'companyName logo').populate('skills_required', 'name').populate('category_ids', 'name');

    return result ? this.mapToEntity(result) : null;
  }

  async incrementViewCount(id: string): Promise<void> {
    await JobPostingModel.findByIdAndUpdate(id, { $inc: { view_count: 1 } });
  }

  async incrementApplicationCount(id: string): Promise<void> {
    await JobPostingModel.findByIdAndUpdate(id, { $inc: { application_count: 1 } });
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

    return result ? this.mapToEntity(result) : null;
  }

  async getJobStats(): Promise<{
    totalJobs: number;
    activeJobs: number;
    inactiveJobs: number;
    totalViews: number;
    totalApplications: number;
  }> {
    const [totalJobs, activeJobs, inactiveJobs, statsAggregate] = await Promise.all([
      JobPostingModel.countDocuments(),
      JobPostingModel.countDocuments({ is_active: true }),
      JobPostingModel.countDocuments({ is_active: false }),
      JobPostingModel.aggregate([
        {
          $group: {
            _id: null,
            totalViews: { $sum: '$view_count' },
            totalApplications: { $sum: '$application_count' },
          },
        },
      ]),
    ]);

    const stats = statsAggregate[0] || { totalViews: 0, totalApplications: 0 };

    return {
      totalJobs,
      activeJobs,
      inactiveJobs,
      totalViews: stats.totalViews,
      totalApplications: stats.totalApplications,
    };
  }

  async getJobStatsByCompany(companyId: string): Promise<{
    totalJobs: number;
    activeJobs: number;
    inactiveJobs: number;
    totalViews: number;
    totalApplications: number;
  }> {
    const companyObjectId = new Types.ObjectId(companyId);

    const [totalJobs, activeJobs, inactiveJobs, statsAggregate] = await Promise.all([
      JobPostingModel.countDocuments({ company_id: companyObjectId }),
      JobPostingModel.countDocuments({ company_id: companyObjectId, is_active: true }),
      JobPostingModel.countDocuments({ company_id: companyObjectId, is_active: false }),
      JobPostingModel.aggregate([
        {
          $match: { company_id: companyObjectId },
        },
        {
          $group: {
            _id: null,
            totalViews: { $sum: '$view_count' },
            totalApplications: { $sum: '$application_count' },
          },
        },
      ]),
    ]);

    const stats = statsAggregate[0] || { totalViews: 0, totalApplications: 0 };

    return {
      totalJobs,
      activeJobs,
      inactiveJobs,
      totalViews: stats.totalViews,
      totalApplications: stats.totalApplications,
    };
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
      query.$or = [{ title: { $regex: filters.search, $options: 'i' } }, { description: { $regex: filters.search, $options: 'i' } }, { location: { $regex: filters.search, $options: 'i' } }];
    }
  }
}
