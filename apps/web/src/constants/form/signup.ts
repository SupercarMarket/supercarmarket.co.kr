import {
  id,
  nickname,
  password,
  name,
  phone,
  authentication,
  service,
  email,
  privacy,
} from 'utils/validator';
import { type Form, type FormType } from '.';

export interface FormState {
  id: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname: string;
  phone: string;
  authentication: string;
  email: string;
  service: string;
  privacy: string;
  description: string;
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
    button: '중복 확인',
    buttonWidth: '120px',
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
    htmlFor: 'name',
    label: '이름',
    type: 'text',
    placeholder: '이름을 입력해주세요',
    options: {
      validate: name,
    },
  },
  {
    htmlFor: 'nickname',
    label: '닉네임',
    type: 'text',
    placeholder: '닉네임을 입력해주세요 (최대 10자)',
    tooltip: '2~10자 한글, 영문 대소문자를 사용할 수 있습니다',
    button: '중복 확인',
    buttonWidth: '120px',
    options: {
      validate: nickname,
    },
    errorMessage: '사용 불가능한 닉네임입니다',
    successMessage: '사용 가능한 닉네임입니다',
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
  {
    htmlFor: 'email',
    label: '이메일',
    type: 'email',
    placeholder: '이메일을 입력해주세요',
    button: '중복 확인',
    buttonWidth: '120px',
    options: {
      validate: email,
    },
    errorMessage: '사용 불가능한 이메일입니다',
    successMessage: '사용 가능한 이메일입니다',
  },
  {
    htmlFor: 'service',
    label: '서비스',
    type: 'agreement',
    placeholder: '서비스 이용약관 내용에 동의합니다. (필수)',
    options: {
      validate: service,
    },
  },
  {
    htmlFor: 'privacy',
    label: '개인정보',
    type: 'agreement',
    placeholder: '개인정보 수집 이용에 동의합니다. (필수)',
    options: {
      validate: privacy,
    },
  },
] as Form<
  keyof FormState,
  Extract<FormType, 'text' | 'password' | 'tel' | 'email' | 'agreement'>
>[];
