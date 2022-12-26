import Button from 'components/common/button';
<<<<<<< HEAD
import { Form, FormLabel } from 'components/common/form';
import auth, { Forms } from 'constants/auth';
import {
  AuthProvider,
  useAuthDispatch,
  useAuthState,
} from 'feature/authProvider';
import { FormProvider, useForm } from 'react-hook-form';

import AuthFormItem from '../authFormItem/authFormItem';
import * as style from './findForm.style';
=======
import { FormProvider, useForm } from 'react-hook-form';

import AuthFormItem, { Forms } from '../authFormItem/authFormItem';
import { Form } from './findForm.style';
>>>>>>> 45c355dfdce16a4132d1d52bd9d7eabb4caf0864

interface FindForms {
  id: Forms[];
  password: Forms[];
}

const forms: FindForms = {
<<<<<<< HEAD
  id: auth.findId(),
  password: auth.findPassword(),
=======
  id: [
    {
      variant: 'Label',
      htmlFor: 'name',
      label: '이름',
      type: 'text',
      placeholder: '이름을 입력해주세요',
      options: {
        required: true,
      },
    },
    {
      variant: 'Label',
      htmlFor: 'phone',
      label: '휴대폰',
      type: 'text',
      placeholder: '숫자만 입력해주세요',
      options: {
        required: true,
      },
      button: '인증번호 받기',
      buttonWidth: '120px',
      errorMessage: '사용 불가능한 아이디입니다',
      successMessage: '사용 가능한 아이디입니다',
    },
    {
      variant: 'Label',
      htmlFor: 'authentication',
      label: '인증번호',
      type: 'text',
      placeholder: '인증번호를 입력해주세요',
      options: {
        required: true,
      },
      button: '인증번호 확인',
      buttonWidth: '120px',
      errorMessage: '사용 불가능한 아이디입니다',
      successMessage: '사용 가능한 아이디입니다',
    },
  ],
  password: [
    {
      variant: 'Label',
      htmlFor: 'id',
      label: '아이디',
      type: 'text',
      placeholder: '아이디를 입력해주세요',
      options: {
        required: true,
      },
      errorMessage: '사용 불가능한 아이디입니다',
      successMessage: '사용 가능한 아이디입니다',
    },
    {
      variant: 'Label',
      htmlFor: 'phone',
      label: '휴대폰',
      type: 'text',
      placeholder: '숫자만 입력해주세요',
      options: {
        required: true,
      },
      errorMessage: '사용 불가능한 아이디입니다',
      successMessage: '사용 가능한 아이디입니다',
    },
    {
      variant: 'Label',
      htmlFor: 'authentication',
      label: '인증번호',
      type: 'text',
      placeholder: '인증번호를 입력해주세요',
      options: {
        required: true,
      },
      errorMessage: '사용 불가능한 아이디입니다',
      successMessage: '사용 가능한 아이디입니다',
    },
  ],
>>>>>>> 45c355dfdce16a4132d1d52bd9d7eabb4caf0864
};

interface FormsState {
  id: string;
  password: string;
  phone: string;
  authentication: string;
}

interface FindFormProps {
  type: 'id' | 'password';
}

const FindForm = ({ type }: FindFormProps) => {
  const methods = useForm<FormsState>();
<<<<<<< HEAD
  const dispatch = useAuthDispatch();
  const state = useAuthState();

  const onSubmit = methods.handleSubmit((data) => console.log(data));
  return (
    <AuthProvider>
      <FormProvider {...methods}>
        <Form css={style.form} onSubmit={onSubmit}>
          {forms[type].map((form) => (
            <FormLabel
              key={form.htmlFor}
              name={form.htmlFor}
              label={form.label}
            >
              <AuthFormItem state={state} dispatch={dispatch} {...form} />
            </FormLabel>
          ))}
        </Form>
        <Button width="340px" type="submit" variant="Primary">
          확인
        </Button>
      </FormProvider>
    </AuthProvider>
=======

  const onSubmit = methods.handleSubmit((data) => console.log(data));
  return (
    <FormProvider {...methods}>
      <Form onSubmit={onSubmit}>
        {forms[type].map((form) => (
          <AuthFormItem key={form.htmlFor} {...form} />
        ))}
      </Form>
      <Button width="340px" type="submit" variant="Primary">
        확인
      </Button>
    </FormProvider>
>>>>>>> 45c355dfdce16a4132d1d52bd9d7eabb4caf0864
  );
};

export default FindForm;
