import { ATSCommentResponseDto, GetCommentsByApplicationParamsDto } from 'src/application/dtos/ats-comment.dto';

export interface IGetCommentsByApplicationUseCase {
  execute(params: GetCommentsByApplicationParamsDto): Promise<ATSCommentResponseDto[]>;
}

