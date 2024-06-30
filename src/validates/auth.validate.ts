import { z } from 'zod';

export const signInSchema = z.object({
  emailOrUsername: z
    .string()
    .min(4, { message: 'Vui lòng nhập ít nhất 4 ký tự!' })
    .max(40, { message: 'Vui lòng không vượt quá 40 ký tự!' })
    .refine((val) => !val.startsWith(' '), {
      message: 'Chữ cái đầu phải là số hoặc chữ!',
    }),
  password: z
    .string()
    .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự!' })
    .max(28, { message: 'Mật khẩu không được vượt quá 28 ký tự!' })
    .refine((val) => !val.startsWith(' '), {
      message: 'Chữ cái đầu phải là số hoặc chữ!',
    }),
});
