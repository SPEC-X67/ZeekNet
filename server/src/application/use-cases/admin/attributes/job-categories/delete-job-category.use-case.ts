import { IJobCategoryRepository } from 'src/domain/interfaces/repositories/job-category/IJobCategoryRepository';
import { NotFoundError, InternalServerError } from 'src/domain/errors/errors';
import { IUseCase } from 'src/domain/interfaces/use-cases/base/IUseCase';
import { injectable, inject } from 'inversify';
import { TYPES } from 'src/shared/constants/types';
import { ERROR } from 'src/shared/constants/messages';

@injectable()
export class DeleteJobCategoryUseCase implements IUseCase<string, boolean> {
  constructor(@inject(TYPES.JobCategoryRepository) private readonly _jobCategoryRepository: IJobCategoryRepository) {}

  async execute(id: string): Promise<boolean> {
    const category = await this._jobCategoryRepository.findById(id);
    if (!category) {
      throw new NotFoundError(ERROR.NOT_FOUND('Category'));
    }

    const deleted = await this._jobCategoryRepository.delete(id);
    if (!deleted) {
      throw new InternalServerError(ERROR.FAILED_TO('delete category'));
    }

    return deleted;
  }
}
