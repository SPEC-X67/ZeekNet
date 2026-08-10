import { z } from 'zod';
import { UploadedFile } from 'src/domain/types/common.types';
import { UpdateOfferStatusSchema, UploadOfferSchema } from 'src/application/validations/ats-offer.validation';

export type UpdateOfferStatusRequestDto = z.infer<typeof UpdateOfferStatusSchema> & {
  offerId: string;
  performedBy: string;
  performedByName: string;
};
export type UpdateOfferStatusDto = z.infer<typeof UpdateOfferStatusSchema>;

export type UploadOfferRequestDto = z.infer<typeof UploadOfferSchema> & {
  applicationId: string;
  performedBy: string;
  file?: UploadedFile;
};

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
