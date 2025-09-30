import { z } from 'zod';

export const CreateCompanyWorkplacePicturesDto = z.object({
  companyId: z.string().optional(), // Will be set by the system
  pictureUrl: z.string().url('Must be a valid URL'),
  caption: z.string().optional(),
});

export const UpdateCompanyWorkplacePicturesDto = CreateCompanyWorkplacePicturesDto.partial();

export type CreateCompanyWorkplacePicturesDto = z.infer<typeof CreateCompanyWorkplacePicturesDto>;
export type UpdateCompanyWorkplacePicturesDto = z.infer<typeof UpdateCompanyWorkplacePicturesDto>;
