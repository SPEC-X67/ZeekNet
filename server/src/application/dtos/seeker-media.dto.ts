import { z } from 'zod';
import {
  UploadAvatarSchema,
  UploadBannerSchema,
  UploadResumeRequestSchema,
} from 'src/application/validations/seeker-media.validation';

export type UploadAvatarDto = z.infer<typeof UploadAvatarSchema>;
export type UploadAvatarRequestDto = UploadAvatarDto;
export type UploadBannerDto = z.infer<typeof UploadBannerSchema>;
export type UploadBannerRequestDto = UploadBannerDto;
export type UploadResumeRequestDto = z.infer<typeof UploadResumeRequestSchema>;
