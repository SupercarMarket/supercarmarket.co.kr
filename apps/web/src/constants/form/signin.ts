import { id } from 'utils/validator';
import { Form, FormType } from '.';

export interface FormState {
  id: string;
  password: string;
}

export const form = [
  {
    htmlFor: 'id',
    label: '아이디',
    type: 'text',
    placeholder: '아이디를 입력해주세요',
    tooltip: '영문/숫자/ 3자 이상 10자 미만으로 입력해주세요.',
    options: {
      validate: id,
    },
    errorMessage: '사용 불가능한 아이디입니다',
    successMessage: '사용 가능한 아이디입니다',
  },
  {
    htmlFor: 'password',
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요',
    tooltip: '영문/숫자/특수문자를 포함하여 8자 이상으로 입력해주세요.',
    options: {
      required: '비밀번호를 입력해주세요.',
    },
  },
] as Form<
  keyof FormState,
  Extract<FormType, 'text' | 'password' | 'tel' | 'email' | 'agreement'>
>[];
