import Button from 'components/common/button';
import { Form, FormLabel } from 'components/common/form';
import auth from 'constants/auth';
import {
  AuthProvider,
  useAuthDispatch,
  useAuthState,
} from 'feature/authProvider';
import { FormProvider } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { user } from 'utils/api/auth';

import AuthFormItem from '../authFormItem/authFormItem';
import * as style from './signupForm.styled';

interface FormState {
  id: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname: string;
  phone: string;
  authentication: string;
  email: string;
}

const SignupForm = () => {
  const methods = useForm<FormState>();
  const state = useAuthState();
  const dispatch = useAuthDispatch();

  const onSubmit = methods.handleSubmit(async (data) => {
    await user.signUp(data);
  });

  return (
    <AuthProvider>
      <FormProvider {...methods}>
        <Form css={style.form} onSubmit={onSubmit}>
          {auth.signup().map((props) => (
            <FormLabel
              key={props.htmlFor}
              name={props.htmlFor}
              label={props.label}
            >
              <AuthFormItem state={state} dispatch={dispatch} {...props} />
            </FormLabel>
          ))}
          <Button width="340px" type="submit" variant="Primary">
            가입하기
          </Button>
        </Form>
      </FormProvider>
    </AuthProvider>
  );
};

export default SignupForm;
