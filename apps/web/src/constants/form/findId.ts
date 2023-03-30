import { authentication, name, phone } from 'utils/validator';
import { Form, FormType } from '.';

export interface FormState {
  name: string;
  phone: string;
  authentication: string;
}

export const form = [
  {
    htmlFor: 'name',
    label: '이름',
    type: 'text',
    placeholder: '이름을 입력해주세요',
    options: {
      validate: name,
    },
  },
  {
    htmlFor: 'phone',
    label: '휴대폰',
    type: 'tel',
    placeholder: '"-" 를 제외한, 숫자만 입력해주세요',
    button: '인증번호 받기',
    buttonWidth: '120px',
    options: {
      validate: phone,
    },
    successMessage: '인증번호를 확인해주세요.',
    errorMessage: '인증번호 요청에 실패했습니다. 재시도해주세요.',
  },
  {
    htmlFor: 'authentication',
    label: '인증번호',
    type: 'tel',
    placeholder: '인증번호를 입력해주세요',
    button: '인증번호 확인',
    buttonWidth: '120px',
    options: {
      validate: authentication,
    },
    successMessage: '인증이 완료되었습니다.',
    errorMessage: '인증에 실패했습니다. 재시도해주세요.',
  },
] as Form<
  keyof FormState,
  Extract<FormType, 'text' | 'password' | 'tel' | 'email' | 'agreement'>
>[];
