import { ATSCommentResponseDto, AddCommentParamsDto } from 'src/application/dtos/ats-comment.dto';

export interface IAddCommentUseCase {
  execute(params: AddCommentParamsDto): Promise<ATSCommentResponseDto>;
}
