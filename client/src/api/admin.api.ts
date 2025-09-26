import { baseApi, buildQueryParams, buildPaginationQuery, buildFilterQuery } from './base.api';

export interface User {
  id: string
  email: string
  role: string
  isVerified: boolean
  isBlocked: boolean
  createdAt: string
  updatedAt: string
}

export interface PaginatedUsersResponse {
  users: User[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface GetAllUsersParams {
  page?: number
  limit?: number
  search?: string
  role?: string
  isBlocked?: boolean
}

export interface BlockUserPayload {
  userId: string
  isBlocked: boolean
}

export interface Company {
  id: string
  userId: string
  companyName: string
  logo: string
  banner: string
  websiteLink: string
  employeeCount: number
  industry: string
  organisation: string
  aboutUs: string
  isVerified: 'pending' | 'rejected' | 'verified'
  isBlocked: boolean
  createdAt: string
  updatedAt: string
  verification?: {
    taxId: string
    businessLicenseUrl: string
  }
}

export interface PaginatedCompaniesResponse {
  companies: Company[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface GetAllCompaniesParams {
  page?: number
  limit?: number
  search?: string
  industry?: string
  isVerified?: 'pending' | 'rejected' | 'verified'
  isBlocked?: boolean
}

export interface CompanyVerificationPayload {
  companyId: string
  isVerified: 'pending' | 'rejected' | 'verified'
  rejection_reason?: string
}

export const adminApi = {
  async getAllUsers(params: GetAllUsersParams = {}): Promise<PaginatedUsersResponse> {
    const queryParams = {
      ...buildPaginationQuery(params.page || 1, params.limit || 10),
      ...buildFilterQuery({
        search: params.search,
        role: params.role,
        isBlocked: params.isBlocked,
      }),
    };
    
    const queryString = buildQueryParams(queryParams);
    const response = await baseApi.get<PaginatedUsersResponse>(`/api/admin/users?${queryString}`)();
    return response.data!;
  },

  async getUserById(userId: string): Promise<User> {
    const response = await baseApi.get<User>(`/api/admin/users/${userId}`)();
    return response.data!;
  },

  async blockUser(payload: BlockUserPayload): Promise<{ message: string }> {
    const response = await baseApi.patch<null>('/api/admin/users/block')(payload);
    return { message: response.message! };
  },

  async getAllCompanies(params: GetAllCompaniesParams = {}): Promise<PaginatedCompaniesResponse> {
    const queryParams = {
      ...buildPaginationQuery(params.page || 1, params.limit || 10),
      ...buildFilterQuery({
        search: params.search,
        industry: params.industry,
        isVerified: params.isVerified,
        isBlocked: params.isBlocked,
      }),
    };
    
    const queryString = buildQueryParams(queryParams);
    const response = await baseApi.get<PaginatedCompaniesResponse>(`/api/admin/companies?${queryString}`)();
    return response.data!;
  },

  async getPendingCompanies(): Promise<PaginatedCompaniesResponse> {
    const response = await baseApi.get<PaginatedCompaniesResponse>('/api/admin/companies/pending')();
    return response.data!;
  },

  async getCompanyById(companyId: string): Promise<Company> {
    const response = await baseApi.get<Company>(`/api/admin/companies/${companyId}`)();
    return response.data!;
  },

  async verifyCompany(payload: CompanyVerificationPayload): Promise<{ message: string }> {
    const response = await baseApi.patch<null>('/api/admin/companies/verify')(payload);
    return { message: response.message! };
  },

  async blockCompany(payload: { companyId: string; isBlocked: boolean }): Promise<{ message: string }> {
    const response = await baseApi.patch<null>('/api/admin/companies/block')(payload);
    return { message: response.message! };
  }
}
