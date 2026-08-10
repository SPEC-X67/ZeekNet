import { injectable, inject } from 'inversify';
import { TYPES } from 'src/shared/constants/types';
import { IGetCommentsByApplicationUseCase } from 'src/domain/interfaces/use-cases/application/comments/IGetCommentsByApplicationUseCase';
import { IATSCommentRepository } from 'src/domain/interfaces/repositories/ats/IATSCommentRepository';
import { GetCommentsByApplicationParamsDto, ATSCommentResponseDto } from 'src/application/dtos/ats-comment.dto';

import { ATSCommentMapper } from 'src/application/mappers/ats/ats-comment.mapper';

@injectable()
export class GetCommentsByApplicationUseCase implements IGetCommentsByApplicationUseCase {
  constructor(
    @inject(TYPES.ATSCommentRepository) private commentRepository: IATSCommentRepository,
  ) { }

  async execute(params: GetCommentsByApplicationParamsDto): Promise<ATSCommentResponseDto[]> {
    const comments = await this.commentRepository.findByApplicationId(params.applicationId, params.stage);
    return ATSCommentMapper.toResponseList(comments);
  }
}
