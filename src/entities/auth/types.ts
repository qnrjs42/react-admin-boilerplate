import { z } from 'zod';

import { LoginFormDtoSchema } from './contracts';

export type LoginFormDto = z.infer<typeof LoginFormDtoSchema>;
