import { ATSCommentResponseDto, GetCommentsByApplicationParamsDto } from 'src/application/dtos/application/comment.dto';

export interface IGetCommentsByApplicationUseCase {
  execute(params: GetCommentsByApplicationParamsDto): Promise<ATSCommentResponseDto[]>;
}

