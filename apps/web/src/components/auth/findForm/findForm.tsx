import Alert from 'components/common/alert';
import Button from 'components/common/button';
import { Form, FormLabel } from 'components/common/form';
import auth, { Forms } from 'constants/auth';
import { findId, findPassword } from 'feature/actions/authActions';
import { useAuthDispatch, useAuthState } from 'feature/authProvider';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { catchNoExist } from 'utils/misc';

import AuthFormItem from '../authFormItem/authFormItem';
import * as style from './findForm.style';

interface FindForms {
  id: Forms[];
  password: Forms[];
}

const forms: FindForms = {
  id: auth.findId(),
  password: auth.findPassword(),
};

interface FormsState {
  id: string;
  name: string;
  phone: string;
  authentication: string;
}

interface FindFormProps {
  type: 'id' | 'password';
}

const FindForm = ({ type }: FindFormProps) => {
  const methods = useForm<FormsState>();
  const dispatch = useAuthDispatch();
  const state = useAuthState();
  const { push } = useRouter();
  const {
    findId: findIdResult,
    findPassword: findPasswordResult,
    authentication: authenticationResult,
    phone: phoneResult,
  } = state;

  const { formState, reset } = methods;

  const onSubmit = methods.handleSubmit((data) => {
    const { id, name, phone, authentication } = data;

    catchNoExist(authenticationResult.data, phoneResult.data);

    if (type === 'id') findId(dispatch, { name, phone, authentication });
    else if (type === 'password')
      findPassword(dispatch, { id, phone, authentication });

    reset();
  });

  React.useEffect(() => {
    if (formState.isSubmitted && findIdResult.data)
      push('/auth/find/result-id');
    if (formState.isSubmitted && findPasswordResult.data)
      push('/auth/find/result-password');
  }, [
    findIdResult.data,
    findPasswordResult.data,
    formState.isSubmitted,
    formState.isSubmitting,
    push,
  ]);

  return (
    <FormProvider {...methods}>
      <Form css={style.form} onSubmit={onSubmit}>
        {forms[type].map((form) => (
          <FormLabel key={form.htmlFor} name={form.htmlFor} label={form.label}>
            <AuthFormItem state={state} dispatch={dispatch} {...form} />
          </FormLabel>
        ))}
        <Button width="340px" type="submit" variant="Primary">
          확인
        </Button>
        {findIdResult.error && (
          <Alert title={findIdResult.error.message} severity="error" />
        )}
        {findPasswordResult.error && (
          <Alert title={findPasswordResult.error.message} severity="error" />
        )}
      </Form>
    </FormProvider>
  );
};

export default FindForm;
