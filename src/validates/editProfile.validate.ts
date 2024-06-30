import { z } from 'zod';

export const editProfileSchema = z.object({
  username: z
    .string()
    .min(4, {
      message: 'Vui lòng nhập ít nhất 4 ký tự!',
    })
    .max(40, { message: 'Vui lòng không vượt quá 40 ký tự!' })
    .refine((val) => !val.startsWith(' '), {
      message: 'Chữ cái đầu phải là số hoặc chữ!',
    }),
  email: z.string().email({ message: 'Email không đúng định dạng!' }),
  full_name: z
    .string()
    .min(4, {
      message: 'Vui lòng nhập ít nhất 4 ký tự!',
    })
    .max(40, { message: 'Vui lòng không vượt quá 40 ký tự!' })
    .refine((val) => !val.startsWith(' '), {
      message: 'Chữ cái đầu phải là chữ!',
    }),
  bio: z.string().max(500, { message: 'Vui lòng không vượt quá 500 ký tự!' }).optional(),
  date_of_birth: z.date().optional(),
  gender: z.string().optional(),
  current_city: z.string().max(100, { message: 'Vui lòng không vượt quá 100 ký tự!' }).optional(),
  from: z.string().max(100, { message: 'Vui lòng không vượt quá 100 ký tự!' }).optional(),
});
