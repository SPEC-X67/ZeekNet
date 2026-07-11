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

// requests/add-comment-params.dto.ts
export interface AddCommentParamsDto {
  applicationId: string;
  comment: string;
  stage: ATSStage;
  subStage?: ATSSubStage;
  userId: string;
}

// requests/add-comment-request.dto.ts
export const AddCommentRequestDtoSchema = z.object({
  applicationId: z.string().min(1, 'Application ID is required'),
  comment: z.string().min(1, 'Comment is required'),
  stage: z.nativeEnum(ATSStage),
  subStage: z.union([
    z.nativeEnum(InReviewSubStage),
    z.nativeEnum(ShortlistedSubStage),
    z.nativeEnum(InterviewSubStage),
    z.nativeEnum(TechnicalTaskSubStage),
    z.nativeEnum(CompensationSubStage),
    z.nativeEnum(OfferSubStage),
  ]).optional(),
});
export type AddCommentRequestDto = z.infer<typeof AddCommentRequestDtoSchema>;

// requests/get-comments-by-application-params.dto.ts
export interface GetCommentsByApplicationParamsDto {
  applicationId: string;
  stage?: string;
}

// responses/ats-comment-response.dto.ts
export interface ATSCommentResponseDto {
  id: string;
  applicationId: string;
  comment: string;
  stage: ATSStage;
  subStage?: ATSSubStage;
  createdAt: Date;
  updatedAt: Date;
}
