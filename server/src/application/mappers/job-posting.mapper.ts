import { injectable } from 'inversify';
import { CreateJobPostingRequestDto } from '../dto/job-posting/job-posting.dto';
import { JobPosting } from '../../domain/entities/job-posting.entity';
import { JobPostingData, JobPostingResponseDto } from './types';

@injectable()
export class JobPostingMapper {
  
  toDomain(dto: CreateJobPostingRequestDto, companyId: string): JobPostingData {
    return {
      company_id: companyId,
      title: dto.title,
      description: dto.description,
      responsibilities: dto.responsibilities,
      qualifications: dto.qualifications,
      nice_to_haves: dto.nice_to_haves,
      benefits: dto.benefits,
      salary: dto.salary,
      employment_types: dto.employment_types,
      location: dto.location,
      skills_required: dto.skills_required,
      category_ids: dto.category_ids,
    };
  }

  toDto(domain: JobPosting): JobPostingResponseDto {
    return {
      id: domain._id,
      company_id: domain.company_id,
      title: domain.title,
      description: domain.description,
      responsibilities: domain.responsibilities,
      qualifications: domain.qualifications,
      nice_to_haves: domain.nice_to_haves,
      benefits: domain.benefits,
      salary: domain.salary,
      employment_types: domain.employment_types,
      location: domain.location,
      skills_required: domain.skills_required,
      category_ids: domain.category_ids,
      is_active: domain.is_active,
      view_count: domain.view_count,
      application_count: domain.application_count,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}