import { AddCommentSchema } from 'src/application/validations/ats-comment.validation';
import { z } from 'zod';
import {
  ATSStage,
  ATSSubStage,
  InReviewSubStage,
  ShortlistedSubStage,
  InterviewSubStage,
  TechnicalTaskSubStage,
  CompensationSubStage,
  OfferSubStage,
} from 'src/domain/enums/ats-stage.enum';

export interface AddCommentParamsDto {
  applicationId: string;
  comment: string;
  stage: ATSStage;
  subStage?: ATSSubStage;
  userId: string;
}
export type AddCommentRequestDto = z.infer<typeof AddCommentSchema>;
export interface GetCommentsByApplicationParamsDto {
  applicationId: string;
  stage?: string;
}
export interface ATSCommentResponseDto {
  id: string;
  applicationId: string;
  comment: string;
  stage: ATSStage;
  subStage?: ATSSubStage;
  createdAt: Date;
  updatedAt: Date;
}
