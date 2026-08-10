import { ParamsWithIdSchema } from 'src/application/validations/common.validation';
import { z } from 'zod';

export type ParamsWithIdDto = z.infer<typeof ParamsWithIdSchema>;
