import { password } from 'utils/validator';
import { Form, FormType } from '.';

export interface FormState {
  password: string;
  passwordConfirm: string;
}

export const form = [
  {
    htmlFor: 'password',
    label: '새 비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요',
    tooltip: '영문/숫자/특수문자를 포함하여 8자 이상으로 입력해주세요.',
    options: {
      validate: password,
    },
  },
  {
    htmlFor: 'passwordConfirm',
    label: '비밀번호 확인',
    type: 'password',
    placeholder: '비밀번호를 한번 더 입력해주세요',
    options: {
      validate: password,
    },
  },
] as Form<
  keyof FormState,
  Extract<FormType, 'text' | 'password' | 'tel' | 'email' | 'agreement'>
>[];
