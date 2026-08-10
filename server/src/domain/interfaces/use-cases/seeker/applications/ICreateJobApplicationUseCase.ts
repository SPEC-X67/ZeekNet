import { CreateJobApplicationSchema } from 'src/application/validations/job-application.validation';
import { UploadedFile } from 'src/domain/types/common.types';
import { z } from 'zod';

export interface ICreateJobApplicationUseCase {
  execute(
    data: Omit<z.infer<typeof CreateJobApplicationSchema>, 'resume_url' | 'resume_filename'> & {
      seekerId?: string;
      resume_url?: string;
      resume_filename?: string;
    },
    resumeFile?: UploadedFile
  ): Promise<{ id: string; }>;
}

