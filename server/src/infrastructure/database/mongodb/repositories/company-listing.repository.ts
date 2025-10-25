import { ICompanyListingRepository } from '../../../../domain/interfaces/repositories';
import { CompanyProfile } from '../../../../domain/entities';
import { CompanyProfileModel } from '../models/company-profile.model';
import { CompanyProfileDocument, CompanyProfileMapper } from '../mappers';

interface CompanyQuery {
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
  industry?: string;
  isVerified?: 'pending' | 'rejected' | 'verified';
  isBlocked?: boolean;
}

export class CompanyListingRepository implements ICompanyListingRepository {
  async getAllCompanies(options: {
    page: number;
    limit: number;
    search?: string;
    industry?: string;
    isVerified?: 'pending' | 'rejected' | 'verified';
    isBlocked?: boolean;
    sortBy?: 'createdAt' | 'companyName' | 'employeeCount';
    sortOrder?: 'asc' | 'desc';
  }): Promise<{ companies: CompanyProfile[]; total: number }> {
    const { page, limit, search, industry, isVerified, isBlocked, sortBy = 'createdAt', sortOrder = 'desc' } = options;

    const query: CompanyQuery = {};

    if (search) {
      query.$or = [{ companyName: { $regex: search, $options: 'i' } }, { industry: { $regex: search, $options: 'i' } }, { organisation: { $regex: search, $options: 'i' } }];
    }

    if (industry) {
      query.industry = industry;
    }

    if (isVerified !== undefined) {
      query.isVerified = isVerified;
    }

    if (isBlocked !== undefined) {
      query.isBlocked = isBlocked;
    }

    const skip = (page - 1) * limit;
    const sortDirection = sortOrder === 'asc' ? 1 : -1;

    const [companies, total] = await Promise.all([
      CompanyProfileModel.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortDirection })
        .exec(),
      CompanyProfileModel.countDocuments(query).exec(),
    ]);

    return {
      companies: companies.map((doc) => CompanyProfileMapper.toEntity(doc as CompanyProfileDocument)),
      total,
    };
  }

  async getCompaniesByIndustry(industry: string, limit: number = 10): Promise<CompanyProfile[]> {
    const docs = await CompanyProfileModel.find({ industry }).limit(limit).sort({ createdAt: -1 }).exec();
    return docs.map((doc) => CompanyProfileMapper.toEntity(doc as CompanyProfileDocument));
  }

  async getVerifiedCompanies(limit: number = 10): Promise<CompanyProfile[]> {
    const docs = await CompanyProfileModel.find({ isVerified: 'verified' }).limit(limit).sort({ createdAt: -1 }).exec();
    return docs.map((doc) => CompanyProfileMapper.toEntity(doc as CompanyProfileDocument));
  }

  async searchCompanies(query: string, limit: number = 10): Promise<CompanyProfile[]> {
    const docs = await CompanyProfileModel.find({
      $or: [{ companyName: { $regex: query, $options: 'i' } }, { industry: { $regex: query, $options: 'i' } }, { organisation: { $regex: query, $options: 'i' } }, { aboutUs: { $regex: query, $options: 'i' } }],
    })
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();
    return docs.map((doc) => CompanyProfileMapper.toEntity(doc as CompanyProfileDocument));
  }
}
