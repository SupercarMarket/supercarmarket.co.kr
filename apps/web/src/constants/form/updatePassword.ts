import { password } from 'utils/validator';
import { Form, FormType } from '.';

export interface FormState {
  password: string;
  newPassword: string;
  newPasswordCheck: string;
}

export const form = [
  {
    htmlFor: 'password',
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요',
    options: {
      validate: password,
    },
  },
  {
    htmlFor: 'newPassword',
    label: '새 비밀번호',
    type: 'password',
    placeholder: '새 비밀번호를 입력해주세요.',
    tooltip: '영문/숫자/특수문자 중 2가지 이상, 8자 이상',
    options: {
      validate: password,
    },
  },
  {
    htmlFor: 'newPasswordCheck',
    label: '새 비밀번호 확인',
    type: 'password',
    placeholder: '새 비밀번호를 한번 더 입력해주세요.',
    options: {
      validate: password,
    },
  },
] as Form<
  keyof FormState,
  Extract<FormType, 'text' | 'password' | 'tel' | 'email' | 'agreement'>
>[];
