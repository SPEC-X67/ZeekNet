import { IJobCategoryRepository } from '../../../domain/interfaces/repositories/IJobCategoryRepository';
import { PaginatedJobCategories, IGetAllJobCategoriesUseCase } from '../../../domain/interfaces/use-cases/IJobCategoryUseCases';

export class GetAllJobCategoriesUseCase implements IGetAllJobCategoriesUseCase {
  constructor(private readonly _jobCategoryRepository: IJobCategoryRepository) {}

  async execute(options: { page?: number; limit?: number; search?: string }): Promise<PaginatedJobCategories> {
    const page = options.page || 1;
    const limit = options.limit || 10;

    const allCategories = await this._jobCategoryRepository.findAll();
    
    let filteredCategories = allCategories;
    if (options.search) {
      const searchLower = options.search.toLowerCase();
      filteredCategories = allCategories.filter(cat => 
        cat.name.toLowerCase().includes(searchLower),
      );
    }

    const total = filteredCategories.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCategories = filteredCategories.slice(startIndex, endIndex);

    return {
      categories: paginatedCategories,
      total,
      page,
      limit,
      totalPages,
    };
  }
}