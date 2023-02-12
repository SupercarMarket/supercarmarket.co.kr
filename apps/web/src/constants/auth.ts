import type { RegisterOptions } from 'react-hook-form';
import {
  authentication,
  email,
  id,
  name,
  nickname,
  password,
  phone,
} from 'utils/validator';

interface FormState {
  id: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname: string;
  phone: string;
  authentication: string;
  email: string;
}

interface Forms {
  htmlFor: keyof FormState;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  tooltip?: string;
  options?: RegisterOptions;
  button?: string;
  buttonWidth?: string;
  successMessage?: string;
  errorMessage?: string;
}

const auth = {
  id: {
    htmlFor: 'id',
    label: '아이디',
    type: 'text',
    placeholder: '아이디를 입력해주세요',
    options: {
      validate: id,
    },
    errorMessage: '사용 불가능한 아이디입니다',
    successMessage: '사용 가능한 아이디입니다',
  } as Forms,
  password: {
    htmlFor: 'password',
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요',
    tooltip: '영문/숫자/특수문자 중 2가지 이상, 8자 이상',
    options: {
      validate: password,
    },
  } as Forms,
  passwordConfirm: {
    htmlFor: 'passwordConfirm',
    label: '비밀번호 확인',
    type: 'password',
    placeholder: '비밀번호를 한번 더 입력해주세요',
    options: {
      validate: password,
    },
  } as Forms,
  newPassword: {
    htmlFor: 'password',
    label: '새 비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요',
    tooltip: '영문/숫자/특수문자 중 2가지 이상, 8자 이상',
    options: {
      validate: password,
    },
  } as Forms,
  name: {
    htmlFor: 'name',
    label: '이름',
    type: 'text',
    placeholder: '이름을 입력해주세요',
    options: {
      validate: name,
    },
  } as Forms,
  nickname: {
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
  } as Forms,
  phone: {
    htmlFor: 'phone',
    label: '휴대폰',
    type: 'tel',
    placeholder: '숫자만 입력해주세요',
    button: '인증번호 받기',
    buttonWidth: '120px',
    options: {
      validate: phone,
    },
    successMessage: '인증번호를 확인해주세요.',
    errorMessage: '인증번호 요청에 실패했습니다. 재시도해주세요.',
  } as Forms,
  authentication: {
    htmlFor: 'authentication',
    label: '인증번호',
    type: 'text',
    placeholder: '인증번호를 입력해주세요',
    button: '인증번호 확인',
    buttonWidth: '120px',
    options: {
      validate: authentication,
    },
    successMessage: '인증이 완료되었습니다.',
    errorMessage: '인증에 실패했습니다. 재시도해주세요.',
  } as Forms,
  email: {
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
  } as Forms,
  phoneAuth: () => [auth.phone, auth.authentication],
  findId: () => [auth.name, ...auth.phoneAuth()],
  findPassword: () => [auth.id, ...auth.phoneAuth()],
  signin: () => [auth.id, auth.password],
  signup: () => [
    { ...auth.id, button: '중복 확인', buttonWidth: '120px' },
    auth.password,
    auth.passwordConfirm,
    auth.name,
    auth.nickname,
    ...auth.phoneAuth(),
    auth.email,
  ],
  resultPassword: () => [auth.newPassword, auth.passwordConfirm],
};

export type { Forms, FormState };
export default auth;
