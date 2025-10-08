import { JobPosting } from '../../../../domain/entities/job-posting.entity';
import { JobPostingDocument } from '../models/job-posting.model';
import { JobPostingResponseDto } from '../../../../application/mappers/types';

export class JobPostingMapper {
  static toEntity(doc: JobPostingDocument): JobPosting {
    let companyId = '';
    let companyName: string | undefined;
    let companyLogo: string | undefined;
    
    if (doc.company_id) {
      const companyIdValue = doc.company_id as unknown;
      if (typeof companyIdValue === 'object' && companyIdValue && '_id' in companyIdValue) {
        companyId = String((companyIdValue as { _id: unknown })._id);
        if ('companyName' in companyIdValue) {
          companyName = String((companyIdValue as { companyName: unknown }).companyName);
        }
        if ('logo' in companyIdValue) {
          companyLogo = String((companyIdValue as { logo: unknown }).logo);
        }
      } else {
        companyId = String(companyIdValue);
      }
    }

    return {
      _id: String(doc._id),
      company_id: companyId,
      company_name: companyName,
      company_logo: companyLogo,
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

  static toClientResponse(doc: JobPostingDocument): JobPostingResponseDto {
    let companyId = '';
    let companyName: string | undefined;
    let companyLogo: string | undefined;
    
    if (doc.company_id) {
      const companyIdValue = doc.company_id as unknown;
      if (typeof companyIdValue === 'object' && companyIdValue && '_id' in companyIdValue) {
        companyId = String((companyIdValue as { _id: unknown })._id);
        if ('companyName' in companyIdValue) {
          companyName = String((companyIdValue as { companyName: unknown }).companyName);
        }
        if ('logo' in companyIdValue) {
          companyLogo = String((companyIdValue as { logo: unknown }).logo);
        }
      } else {
        companyId = String(companyIdValue);
      }
    }
    
    return {
      id: String(doc._id),
      company_id: companyId,
      company_name: companyName,
      company_logo: companyLogo,
      title: doc.title,
      description: doc.description || '',
      responsibilities: doc.responsibilities || [],
      qualifications: doc.qualifications || [],
      nice_to_haves: doc.nice_to_haves || [],
      benefits: doc.benefits || [],
      salary: {
        min: doc.salary.min,
        max: doc.salary.max,
      },
      employment_types: Array.isArray(doc.employment_types) ? doc.employment_types : [],
      location: doc.location,
      skills_required: Array.isArray(doc.skills_required) ? doc.skills_required : [],
      category_ids: Array.isArray(doc.category_ids) ? doc.category_ids : [],
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt || doc.createdAt,
      is_active: doc.is_active !== undefined ? doc.is_active : true,
      application_count: doc.application_count || 0,
      view_count: doc.view_count || 0,
    };
  }
}
