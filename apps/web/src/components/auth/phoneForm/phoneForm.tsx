import { Alert, Button, Form, FormLabel } from '@supercarmarket/ui';
import { ErrorCode } from '@supercarmarket/lib';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import AuthFormItem from '../authFormItem/authFormItem';
import * as style from '../signupForm/signupForm.styled';
import { form } from 'constants/form/findId';

interface PhoneFormProps {
  uuid: string;
}

interface FormState {
  name: string;
  phone: string;
  authentication: string;
}

const PhoneForm = ({ uuid }: PhoneFormProps) => {
  const methods = useForm<FormState>();
  const { replace } = useRouter();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const onSubmit = methods.handleSubmit(async (data) => {
    const { phone, authentication, name } = data;
    const response = await signIn('Phone', {
      name,
      phone,
      authentication,
      uuid,
      redirect: false,
    });

    if (!response) setErrorMessage(ErrorCode[450]);
    else if (response.ok) replace('/');
    else setErrorMessage(ErrorCode[450]);
  });
  return (
    <FormProvider {...methods}>
      <Form css={style.form} onSubmit={onSubmit}>
        {form.map((form) => (
          <FormLabel key={form.htmlFor} name={form.htmlFor} label={form.label}>
            <AuthFormItem {...form} />
          </FormLabel>
        ))}
        <Button type="submit" fullWidth>
          인증
        </Button>
        {errorMessage && <Alert title={errorMessage} severity="error" />}
      </Form>
    </FormProvider>
  );
};

export default PhoneForm;
