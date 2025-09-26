import { api } from './index';
import type { ApiEnvelope } from '@/interfaces/auth';

export const createApiMethod = <T>(
  endpoint: string,
  method: 'get' | 'post' | 'put' | 'delete' | 'patch'
) => {
  return async (payload?: unknown, config?: Record<string, unknown>): Promise<ApiEnvelope<T>> => {
    const res = await api[method]<ApiEnvelope<T>>(endpoint, payload, config);
    return res.data;
  };
};

export const baseApi = {
  get: <T>(endpoint: string) => createApiMethod<T>(endpoint, 'get'),
  post: <T>(endpoint: string) => createApiMethod<T>(endpoint, 'post'),
  put: <T>(endpoint: string) => createApiMethod<T>(endpoint, 'put'),
  patch: <T>(endpoint: string) => createApiMethod<T>(endpoint, 'patch'),
  delete: <T>(endpoint: string) => createApiMethod<T>(endpoint, 'delete'),
};

export const buildQueryParams = (params: Record<string, unknown>): string => {
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, value.toString());
    }
  });
  
  return queryParams.toString();
};

export const buildPaginationQuery = (page: number, limit: number) => ({
  page: page.toString(),
  limit: limit.toString(),
});

export const buildSearchQuery = (searchTerm: string) => ({
  search: searchTerm,
});

export const buildFilterQuery = (filters: Record<string, unknown>) => {
  const queryParams: Record<string, string> = {};
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams[key] = value.toString();
    }
  });
  
  return queryParams;
};

export const buildSortQuery = (field: string, order: 'asc' | 'desc' = 'asc') => ({
  sort: field,
  order: order,
});

export const buildFormData = (data: Record<string, unknown>, fileFields: string[] = []): FormData => {
  const formData = new FormData();
  
  Object.entries(data).forEach(([key, value]) => {
    if (value && !fileFields.includes(key)) {
      formData.append(key, value as string);
    }
  });
  
  return formData;
};

export const uploadFile = async <T>(
  endpoint: string,
  file: File,
  fieldName: string = 'file',
  additionalData: Record<string, unknown> = {}
): Promise<ApiEnvelope<T>> => {
  const formData = new FormData();
  formData.append(fieldName, file);
  
  Object.entries(additionalData).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value as string);
    }
  });
  
  const res = await api.post<ApiEnvelope<T>>(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return res.data;
};

export const uploadMultipleFiles = async <T>(
  endpoint: string,
  files: File[],
  fieldName: string = 'files',
  additionalData: Record<string, unknown> = {}
): Promise<ApiEnvelope<T>> => {
  const formData = new FormData();
  
  files.forEach((file) => {
    formData.append(fieldName, file);
  });
  
  Object.entries(additionalData).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value as string);
    }
  });
  
  const res = await api.post<ApiEnvelope<T>>(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return res.data;
};

export const createCrudApi = <T>(baseEndpoint: string) => ({
  getAll: (params: Record<string, unknown> = {}) => {
    const queryString = buildQueryParams(params);
    const endpoint = queryString ? `${baseEndpoint}?${queryString}` : baseEndpoint;
    return baseApi.get<T[]>(endpoint)();
  },
  getById: (id: string) => baseApi.get<T>(`${baseEndpoint}/${id}`)(),
  create: (data: Partial<T>) => baseApi.post<T>(baseEndpoint)(data),
  update: (id: string, data: Partial<T>) => baseApi.put<T>(`${baseEndpoint}/${id}`)(data),
  patch: (id: string, data: Partial<T>) => baseApi.patch<T>(`${baseEndpoint}/${id}`)(data),
  delete: (id: string) => baseApi.delete<void>(`${baseEndpoint}/${id}`)(),
});
