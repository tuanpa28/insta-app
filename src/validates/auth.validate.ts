import * as yup from 'yup';

export const loginSchema = yup.object({
  emailOrUsername: yup.string().required('Vui lòng nhập tên tài khoản hoặc email!'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu!')
    .min(6, 'Mật khẩu ít nhất 6 ký tự!')
    .max(24, 'Mật khẩu nhiều nhất 24 kí tự'),
});
