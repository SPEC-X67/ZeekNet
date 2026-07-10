import { JobCategoryDto } from 'src/application/dtos/admin/attributes/job-categories/common/job-category.dto';

export interface PaginatedJobCategoriesResultDto {
  categories: JobCategoryDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
