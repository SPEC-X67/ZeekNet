import { CreateCompanyWorkplacePicturesSchema, UpdateCompanyWorkplacePicturesSchema, DeleteImageSchema, UploadBusinessLicenseSchema, UploadLogoSchema, UploadWorkplacePictureSchema } from 'src/application/validations/company-media.validation';
import { z } from 'zod';

export {
  CreateCompanyWorkplacePicturesSchema as CreateCompanyWorkplacePicturesDto,
  UpdateCompanyWorkplacePicturesSchema as UpdateCompanyWorkplacePicturesDto,
};
export type CreateCompanyWorkplacePicturesRequestDto = z.infer<typeof CreateCompanyWorkplacePicturesSchema>;
export type UpdateCompanyWorkplacePicturesRequestDto = z.infer<typeof UpdateCompanyWorkplacePicturesSchema>;
export type DeleteImageDto = z.infer<typeof DeleteImageSchema>;
export type UploadBusinessLicenseDto = z.infer<typeof UploadBusinessLicenseSchema>;
export type UploadLogoRequestDto = z.infer<typeof UploadLogoSchema>;
export type UploadWorkplacePictureDto = z.infer<typeof UploadWorkplacePictureSchema>;
export interface CompanyWorkplacePictureResponseDto {
  id: string;
  pictureUrl: string;
  caption?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface UploadBusinessLicenseResult {
  url: string;
  filename: string;
}
export interface UploadLogoResult {
  url: string;
  filename: string;
}
export interface UploadWorkplacePictureResult {
  url: string;
  filename: string;
}
