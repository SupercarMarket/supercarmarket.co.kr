import { Form, FormType } from '.';

export interface FormState {
  id: string;
  name: string;
  nickname: string;
  phone: string;
  authentication: string;
  email: string;
  description: string;
}

export const form = [
  {
    htmlFor: 'id',
    label: '아이디',
    type: 'text',
    placeholder: '아이디를 입력해주세요',
    options: {},
    readOnly: true,
    errorMessage: '사용 불가능한 아이디입니다',
    successMessage: '사용 가능한 아이디입니다',
  },
  {
    htmlFor: 'name',
    label: '이름',
    type: 'text',
    readOnly: true,
    placeholder: '이름을 입력해주세요',
    options: {},
  },
  {
    htmlFor: 'nickname',
    label: '닉네임',
    type: 'text',
    placeholder: '닉네임을 입력해주세요 (최대 10자)',
    tooltip: '2~10자 한글, 영문 대소문자를 사용할 수 있습니다',
    button: '중복 확인',
    buttonWidth: '120px',
    options: {},
    errorMessage: '사용 불가능한 닉네임입니다',
    successMessage: '사용 가능한 닉네임입니다',
  },
  {
    htmlFor: 'phone',
    label: '휴대폰',
    type: 'tel',
    placeholder: '숫자만 입력해주세요',
    button: '인증번호 받기',
    buttonWidth: '120px',
    options: {},
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
    options: {},
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
    options: {},
    errorMessage: '사용 불가능한 이메일입니다',
    successMessage: '사용 가능한 이메일입니다',
  },
  {
    htmlFor: 'description',
    label: '소개',
    type: 'text',
    placeholder: '소개를 입력해주세요 (최대 50자)',
    options: {},
  },
] as Form<
  keyof FormState,
  Extract<FormType, 'text' | 'password' | 'tel' | 'email' | 'agreement'>
>[];
