import Joi from 'joi';

export const signInSchema = Joi.object({
  emailOrUsername: Joi.alternatives().try(
    Joi.string().min(3).max(30).required().messages({
      'string.base': 'Tên tài khoản phải là một chuỗi!',
      'string.empty': 'Tên tài khoản không được để trống!',
      'string.min': 'Tên tài khoản phải có ít nhất {#limit} ký tự!',
      'string.max': 'Tên tài khoản không được vượt quá {#limit} ký tự!',
      'any.required': 'Tên tài khoản hoặc email là bắt buộc!',
    }),
    Joi.string().email().required().messages({
      'string.base': 'Email phải là một chuỗi!',
      'string.email': 'Địa chỉ email không hợp lệ!',
      'string.empty': 'Email không được để trống!',
      'any.required': 'Tên tài khoản hoặc email là bắt buộc!',
    }),
  ),
  password: Joi.string().min(6).max(28).required().messages({
    'string.base': 'Mật khẩu phải là một chuỗi!',
    'string.empty': 'Mật khẩu không được để trống!',
    'string.min': 'Mật khẩu phải có ít nhất {#limit} ký tự!',
    'string.max': 'Mật khẩu không được vượt quá {#limit} ký tự!',
    'any.required': 'Vui lòng nhập mật khẩu!',
  }),
});
