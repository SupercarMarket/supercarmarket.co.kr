import Button from 'components/common/button';
import { Form, FormLabel } from 'components/common/form';
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
  },
];

const PhoneForm = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Form css={style.form}>
        {forms.map((form) => (
          <FormLabel key={form.htmlFor} name={form.htmlFor} label={form.label}>
            <AuthFormItem {...form} />
          </FormLabel>
        ))}
        <Button fullWidth>인증</Button>
      </Form>
    </FormProvider>
  );
};

export default PhoneForm;
