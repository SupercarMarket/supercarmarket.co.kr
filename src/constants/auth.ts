import type { RegisterOptions } from 'react-hook-form';

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
      required: {
        value: true,
        message: '필수로 입력해주세요.',
      },
      pattern: {
        value: /^[a-zA-Z][0-9a-zA-Z]{3,10}$/,
        message: '영문/숫자/ 3자 이상 10자 미만으로 입력해주세요.',
      },
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
      required: {
        value: true,
        message: '필수로 입력해주세요.',
      },
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*d)(?=.*[$@$!%*#?&])[A-Za-zd$@$!%*#?&]{8,}$/,
        message: '영문/숫자/특수문자 중 2가지 이상, 8자 이상으로 입력해주세요.',
      },
    },
  } as Forms,
  passwordConfirm: {
    htmlFor: 'passwordConfirm',
    label: '비밀번호 확인',
    type: 'password',
    placeholder: '비밀번호를 한번 더 입력해주세요',
    options: {
      required: {
        value: true,
        message: '필수로 입력해주세요.',
      },
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*d)(?=.*[$@$!%*#?&])[A-Za-zd$@$!%*#?&]{8,}$/,
        message: '영문/숫자/특수문자 중 2가지 이상, 8자 이상으로 입력해주세요.',
      },
    },
  } as Forms,
  name: {
    htmlFor: 'name',
    label: '이름',
    type: 'text',
    placeholder: '이름을 입력해주세요',
    options: {
      required: {
        value: true,
        message: '필수로 입력해주세요.',
      },
      pattern: {
        value: /^[가-힣]{2,6}$/,
        message: '한글 2자 이상 6자 미만으로 입력해주세요',
      },
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
      required: {
        value: true,
        message: '필수로 입력해주세요.',
      },
      pattern: {
        value: /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{2,10}$/,
        message: '한글/영문/대소문자 2자 이상 10자 미만으로 입력해주세요',
      },
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
      required: {
        value: true,
        message: '필수로 입력해주세요.',
      },
      pattern: /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/,
    },
  } as Forms,
  authentication: {
    htmlFor: 'authentication',
    label: '인증번호',
    type: 'text',
    placeholder: '인증번호를 입력해주세요',
    button: '인증번호 확인',
    buttonWidth: '120px',
    options: {
      required: {
        value: true,
        message: '필수로 입력해주세요.',
      },
    },
  } as Forms,
  email: {
    htmlFor: 'email',
    label: '이메일',
    type: 'email',
    placeholder: '이메일을 입력해주세요',
    button: '중복 확인',
    buttonWidth: '120px',
    options: {
      required: {
        value: true,
        message: '필수로 입력해주세요.',
      },
      pattern: {
        value:
          /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
        message: '이메일 형식에 맞춰 입력해주세요.',
      },
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
};

export type { Forms, FormState };
export default auth;
