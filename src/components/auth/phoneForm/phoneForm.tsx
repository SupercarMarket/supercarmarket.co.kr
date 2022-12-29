import Button from 'components/common/button';
import { Form, FormLabel } from 'components/common/form';
import auth from 'constants/auth';
import { useAuthDispatch, useAuthState } from 'feature/authProvider';
import { signIn } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';

import AuthFormItem from '../authFormItem/authFormItem';
import * as style from './phoneForm.styled';

interface PhoneFormProps {
  uuid: string;
}

interface FormState {
  phone: string;
  authentication: string;
}

const PhoneForm = ({ uuid }: PhoneFormProps) => {
  const methods = useForm<FormState>();
  const state = useAuthState();
  const dispatch = useAuthDispatch();
  const onSubmit = methods.handleSubmit(async (data) => {
    const { phone, authentication } = data;
    const response = await signIn('Phone', {
      phone,
      authentication,
      uuid,
    });
    console.log(response);
  });
  return (
    <FormProvider {...methods}>
      <Form css={style.form} onSubmit={onSubmit}>
        {auth.phoneAuth().map((form) => (
          <FormLabel key={form.htmlFor} name={form.htmlFor} label={form.label}>
            <AuthFormItem {...form} state={state} dispatch={dispatch} />
          </FormLabel>
        ))}
        <Button type="submit" fullWidth>
          인증
        </Button>
      </Form>
    </FormProvider>
  );
};

export default PhoneForm;
