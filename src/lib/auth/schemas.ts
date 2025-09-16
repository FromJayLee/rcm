import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요')
    .email('올바른 이메일 형식이 아닙니다'),
  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요')
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다'),
});

export const signupSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요')
    .email('올바른 이메일 형식이 아닙니다'),
  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요')
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다'
    ),
  confirmPassword: z
    .string()
    .min(1, '비밀번호 확인을 입력해주세요'),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirmPassword'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
