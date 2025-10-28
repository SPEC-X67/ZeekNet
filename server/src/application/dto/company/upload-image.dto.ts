import { z } from 'zod';

export const UploadWorkplacePictureDto = z.object({
  url: z.string().url('Must be a valid URL'),
});

export type UploadWorkplacePictureRequestDto = z.infer<typeof UploadWorkplacePictureDto>;

