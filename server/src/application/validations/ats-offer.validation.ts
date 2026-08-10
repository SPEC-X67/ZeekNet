import { z } from 'zod';
import { OfferStatus } from 'src/domain/enums/offer-status.enum';

export const UpdateOfferStatusSchema = z.object({
  status: z.nativeEnum(OfferStatus),
  withdrawalReason: z.string().optional(),
});

export const UploadOfferSchema = z.object({
  offerAmount: z.string().optional(),
  documentUrl: z.string().optional(),
});
