import { ApplicationFiltersSchema, BulkUpdateApplicationsSchema, GetApplicationDetailsSchema, GetApplicationsByJobSchema, GetCandidateDetailsSchema, GetCandidatesSchema, UpdateApplicationScoreSchema } from 'src/application/validations/company-hiring.validation';
import { z } from 'zod';
import { ATSStage, ATSSubStage } from 'src/domain/enums/ats-stage.enum';

export type ApplicationFiltersRequestDto = z.infer<typeof ApplicationFiltersSchema>;
export type BulkUpdateApplicationsRequestDto = z.infer<typeof BulkUpdateApplicationsSchema> & {
  companyId: string;
};
export type GetApplicationDetailsRequestDto = z.infer<typeof GetApplicationDetailsSchema>;
export type GetApplicationsByJobRequestDto = z.infer<typeof GetApplicationsByJobSchema>;
export type GetCandidateDetailsRequestDto = z.infer<typeof GetCandidateDetailsSchema>;
export type GetCandidatesRequestDto = z.infer<typeof GetCandidatesSchema>;
export type UpdateApplicationScoreDto = z.infer<typeof UpdateApplicationScoreSchema>;
export interface BulkUpdateApplicationsResponseDto {
  success: boolean;
  updated: number;
  failed: number;
  errors: Array<{
    application_id: string;
    error: string;
  }>;
}
