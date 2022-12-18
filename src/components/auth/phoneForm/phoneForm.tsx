import Button from 'components/common/button';
import { Form, FormLabel } from 'components/common/form';
import { useAuthDispatch, useAuthState } from 'feature/authProvider';
import { FormProvider, useForm } from 'react-hook-form';

import type { Forms } from '../authFormItem/authFormItem';
import AuthFormItem from '../authFormItem/authFormItem';
import * as style from './phoneForm.styled';

const forms: Forms[] = [
  {
    htmlFor: 'phone',
    label: '휴대폰',
    type: 'tel',
    placeholder: '숫자만 입력해주세요',
    button: '인증번호 받기',
    buttonWidth: '120px',
    options: {
      required: true,
    },
    successMessage: '인증번호를 확인해주세요.',
    errorMessage: '인증번호 전송에 실패했습니다. 재시도해주세요.',
  },
  {
    htmlFor: 'authentication',
    label: '인증번호',
    type: 'text',
    placeholder: '인증번호를 입력해주세요',
    button: '인증번호 확인',
    buttonWidth: '120px',
    options: {
      required: true,
    },
    successMessage: '인증이 완료되었습니다.',
    errorMessage: '인증번호가 틀립니다.',
  },
];

interface FormState {
  phone: string;
  authentication: string;
}

const PhoneForm = () => {
  const methods = useForm<FormState>();
  const state = useAuthState();
  const dispatch = useAuthDispatch();
  return (
    <FormProvider {...methods}>
      <Form css={style.form}>
        {forms.map((form) => (
          <FormLabel key={form.htmlFor} name={form.htmlFor} label={form.label}>
            <AuthFormItem {...form} state={state} dispatch={dispatch} />
          </FormLabel>
        ))}
        <Button fullWidth>인증</Button>
      </Form>
    </FormProvider>
  );
};

export default PhoneForm;
