import { z } from 'zod';

export const LoginFormDtoSchema = z.object({
  email: z.string().email({ message: '유효하지 않은 이메일입니다.' }),
  password: z
    .string()
    .min(6, { message: '최소 6글자 이상 입력해주세요.' })
    .max(50, { message: '최대 50글자 이하로 입력해주세요.' }),
});
