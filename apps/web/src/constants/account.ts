import * as React from 'react-hook-form';
import { password } from 'utils/validator';

type AccountTab =
  | 'dealer-product'
  | 'product'
  | 'magazine'
  | 'inquiry'
  | 'community'
  | 'comment';

interface AccountRoute {
  title: string;
  route: string;
}

interface FormState {
  id: string;
  name: string;
  nickname: string;
  phone: string;
  authentication: string;
  email: string;
  description: string;
}

interface AccountPasswordUpdateFormState {
  password: string;
  newPassword: string;
  newPasswordCheck: string;
}

interface Forms<T> {
  htmlFor: keyof T;
  type: 'text' | 'email' | 'password' | 'tel';
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
  accountTab: [
    'dealer-product',
    'product',
    'magazine',
    'inquiry',
    'community',
    'comment',
  ],
  accountRoutes: {
    myAccount: (sub: string) => [
      {
        title: '스크랩 매물',
        href: {
          pathname: `/account/${sub}`,
          query: {
            tab: 'product',
          },
        },
        category: 'product',
      },
      {
        title: '스크랩 글',
        href: {
          pathname: `/account/${sub}`,
          query: {
            tab: 'magazine',
          },
        },
        category: 'magazine',
      },
      ...account.accountRoutes.someoneAccount(sub),
      {
        title: '문의신청내역',
        href: {
          pathname: `/account/${sub}`,
          query: {
            tab: 'inquiry',
          },
        },
        category: 'inquiry',
      },
    ],
    someoneAccount: (sub: string) => [
      {
        title: '작성한 글',
        href: {
          pathname: `/account/${sub}`,
          query: {
            tab: 'community',
          },
        },
        category: 'community',
      },
      {
        title: '댓글단 글',
        href: {
          pathname: `/account/${sub}`,
          query: {
            tab: 'comment',
          },
        },
        category: 'comment',
      },
    ],
    dealerAccount: (sub: string) => [
      {
        title: '업로드 매물',
        href: {
          pathname: `/account/${sub}`,
          query: {
            tab: 'dealer-product',
          },
        },
        category: 'dealer-product',
      },
      ...account.accountRoutes.myAccount(sub),
    ],
  },
  update: [
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
  ] as Forms<FormState>[],
  updatePassword: [
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
  ] as Forms<AccountPasswordUpdateFormState>[],
};

export type {
  AccountRoute,
  AccountTab,
  Forms,
  FormState,
  AccountPasswordUpdateFormState,
};
export default account;
