import Button from 'components/common/button';
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
  password: string;
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
  );
};

export default FindForm;
