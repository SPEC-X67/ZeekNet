import { z } from 'zod';
import { UploadedFile } from 'src/domain/types/common.types';

// requests/update-offer-status-request.dto.ts
export const UpdateOfferStatusRequestSchema = z.object({
  status: z.enum(['draft', 'sent', 'signed', 'declined']),
  withdrawalReason: z.string().optional(),
});
export type UpdateOfferStatusRequestDto = z.infer<typeof UpdateOfferStatusRequestSchema> & {
  offerId: string;
  performedBy: string;
  performedByName: string;
};

// requests/update-offer-status.dto.ts
export const UpdateOfferStatusDtoSchema = z.object({
  status: z.enum(['draft', 'sent', 'signed', 'declined']),
  withdrawalReason: z.string().optional(),
});
export type UpdateOfferStatusDto = z.infer<typeof UpdateOfferStatusDtoSchema>;

// requests/upload-offer.dto.ts
export const UploadOfferSchema = z.object({
  offerAmount: z.string().optional(),
  documentUrl: z.string().optional(),
});
export type UploadOfferRequestDto = z.infer<typeof UploadOfferSchema> & {
  applicationId: string;
  performedBy: string;
  file?: UploadedFile;
};

// responses/ats-offer-response.dto.ts
export interface ATSOfferResponseDto {
  id: string;
  applicationId: string;
  documentUrl?: string;
  offerAmount?: string;
  status: string;
  signedDocumentUrl?: string;
  withdrawalReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
