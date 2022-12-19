import Button from 'components/common/button';
import { Form, FormLabel } from 'components/common/form';
import auth from 'constants/auth';
import { useAuthDispatch, useAuthState } from 'feature/authProvider';
import { FormProvider, useForm } from 'react-hook-form';

import AuthFormItem from '../authFormItem/authFormItem';
import * as style from './phoneForm.styled';

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
        {auth.phoneAuth().map((form) => (
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
