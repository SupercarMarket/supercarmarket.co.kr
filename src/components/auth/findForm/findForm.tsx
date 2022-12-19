import Button from 'components/common/button';
import { FormProvider, useForm } from 'react-hook-form';

import AuthFormItem, { Forms } from '../authFormItem/authFormItem';
import { Form } from './findForm.style';

interface FindForms {
  id: Forms[];
  password: Forms[];
}

const forms: FindForms = {
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
  );
};

export default FindForm;
