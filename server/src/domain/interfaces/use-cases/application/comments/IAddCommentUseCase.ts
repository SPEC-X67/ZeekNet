import { ATSCommentResponseDto, AddCommentParamsDto } from 'src/application/dtos/application/comment.dto';

export interface IAddCommentUseCase {
  execute(params: AddCommentParamsDto): Promise<ATSCommentResponseDto>;
}
