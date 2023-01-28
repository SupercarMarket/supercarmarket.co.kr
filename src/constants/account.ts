import * as React from 'react-hook-form';

type AccountTab = 'product' | 'magazine' | 'inquiry' | 'community' | 'comment';

interface AccountRoute {
  title: string;
  route: string;
}

interface FormState {
  id: string;
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
  name: string;
  nickname: string;
  phone: string;
  authentication: string;
  email: string;
  description: string;
  gallery: string[];
  background: string[];
}

interface Forms {
  htmlFor: keyof FormState;
  type: 'text' | 'email' | 'password' | 'tel' | 'images' | 'image';
  label?: string;
  placeholder?: string;
  tooltip?: string;
  options?: React.RegisterOptions;
  button?: string;
  buttonWidth?: string;
  successMessage?: string;
  errorMessage?: string;
}

const account = {
  accountTab: ['product', 'magazine', 'inquiry', 'community', 'comment'],
  accountRoutes: {
    myAccount: (sub: string) => [
      {
        title: '스크랩 매물',
        route: `/account/${sub}?tab=product`,
      },
      {
        title: '스크랩 글',
        route: `/account/${sub}?tab=magazine`,
      },
      ...account.accountRoutes.someoneAccount(sub),
      {
        title: '문의신청내역',
        route: `/account/${sub}?tab=inquiry`,
      },
    ],
    someoneAccount: (sub: string) => [
      {
        title: '작성한 글',
        route: `/account/${sub}?tab=community`,
      },
      {
        title: '댓글단 글',
        route: `/account/${sub}?tab=comment`,
      },
    ],
  },
  forms: [
    {
      htmlFor: 'id',
      label: '아이디',
      type: 'text',
      placeholder: '아이디를 입력해주세요',
      options: {},
      errorMessage: '사용 불가능한 아이디입니다',
      successMessage: '사용 가능한 아이디입니다',
    },
    {
      htmlFor: 'password',
      label: '현재 비밀번호',
      type: 'password',
      placeholder: '비밀번호를 입력해주세요',
      options: {},
    },
    {
      htmlFor: 'newPassword',
      label: '새 비밀번호',
      type: 'password',
      placeholder: '비밀번호를 입력해주세요',
      tooltip: '영문/숫자/특수문자 중 2가지 이상, 8자 이상',
      options: {},
    },
    {
      htmlFor: 'newPasswordConfirm',
      label: '새 비밀번호 확인',
      type: 'password',
      placeholder: '비밀번호를 한번 더 입력해주세요',
      options: {},
    },
    {
      htmlFor: 'name',
      label: '이름',
      type: 'text',
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
      type: 'text',
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
    {
      htmlFor: 'gallery',
      label: '갤러리',
      type: 'images',
      options: {},
    },
    {
      htmlFor: 'background',
      label: '배경',
      type: 'image',
      options: {},
    },
  ] as Forms[],
} as const;

export type { AccountRoute, AccountTab, Forms, FormState };
export default account;
