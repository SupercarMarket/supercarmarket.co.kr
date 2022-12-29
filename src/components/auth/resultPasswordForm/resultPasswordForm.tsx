import Alert from 'components/common/alert';
import Button from 'components/common/button';
import { Form, FormLabel } from 'components/common/form';
import auth from 'constants/auth';
import { resetPassword } from 'feature/actions/authActions';
import { useAuthDispatch, useAuthState } from 'feature/authProvider';
import { FormProvider, useForm } from 'react-hook-form';
import { catchNoExist } from 'utils/misc';

import AuthFormItem from '../authFormItem/authFormItem';
import * as style from './resultPasswordForm.styled';

interface FormState {
  password: string;
  passwordConfirm: string;
}

const ResultPasswordForm = () => {
  const state = useAuthState();
  const dispatch = useAuthDispatch();
  const methods = useForm<FormState>();

  const {
    findPassword: findPasswordResult,
    resetPassword: resetPasswordResult,
  } = state;

  const onSubmit = methods.handleSubmit((data) => {
    if (!findPasswordResult.data) return;

    const { password, passwordConfirm } = data;
    const { phone, authentication, id } = findPasswordResult.data;

    catchNoExist(password, passwordConfirm, phone, authentication, id);

    resetPassword(dispatch, {
      password,
      authentication,
      phone,
      id,
    });
  });

  return (
    <FormProvider {...methods}>
      <Form css={style.form} onSubmit={onSubmit}>
        {auth.resultPassword().map((form) => (
          <FormLabel key={form.htmlFor} name={form.htmlFor} label={form.label}>
            <AuthFormItem {...form} state={state} dispatch={dispatch} />
          </FormLabel>
        ))}
        <Button type="submit" width="340px">
          확인
        </Button>
        {resetPasswordResult.error && (
          <Alert title="에러 발생" severity="error" />
        )}
      </Form>
    </FormProvider>
  );
};

export default ResultPasswordForm;
