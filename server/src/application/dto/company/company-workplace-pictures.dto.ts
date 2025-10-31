import { z } from 'zod';

export const CreateCompanyWorkplacePicturesDtoSchema = z.object({
  companyId: z.string().optional(),
  pictureUrl: z.string().url('Must be a valid URL'),
  caption: z.string().optional(),
});

export const UpdateCompanyWorkplacePicturesDtoSchema = CreateCompanyWorkplacePicturesDtoSchema.partial();

export const CreateCompanyWorkplacePicturesDto = CreateCompanyWorkplacePicturesDtoSchema;
export const UpdateCompanyWorkplacePicturesDto = UpdateCompanyWorkplacePicturesDtoSchema;

export type CreateCompanyWorkplacePicturesRequestDto = z.infer<typeof CreateCompanyWorkplacePicturesDto>;
export type UpdateCompanyWorkplacePicturesRequestDto = z.infer<typeof UpdateCompanyWorkplacePicturesDto>;