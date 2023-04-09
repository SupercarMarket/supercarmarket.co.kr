import * as React from 'react';
import { Alert, Button, Form, FormLabel } from '@supercarmarket/ui';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import AuthFormItem from '../authFormItem/authFormItem';
import * as style from '../signupForm/signupForm.styled';
import { Modal } from 'components/common/modal';
import { form as findPasswordForm } from 'constants/form/findPassword';
import { form as resultPasswordForm } from 'constants/form/resultPassword';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS, useResetPassword } from 'http/server/auth';
import { ModalContext } from 'feature/ModalProvider';

interface FindForms {
  password: typeof findPasswordForm;
  'result-password': typeof resultPasswordForm;
}

const forms: FindForms = {
  password: findPasswordForm,
  'result-password': resultPasswordForm,
};

interface FormsState {
  id: string;
  phone: string;
  password: string;
  passwordConfirm: string;
  authentication: string;
}

const FindPasswordForm = () => {
  const queryClient = useQueryClient();
  const methods = useForm<FormsState>();
  const resetPasswordMutation = useResetPassword({
    onError: (error: Error) => {
      setError(error.message);
    },
  });
  const [process, setProcess] = React.useState<'password' | 'result-password'>(
    'password'
  );
  const [id, setId] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const { onOpen, onClose } = React.useContext(ModalContext);
  const { replace } = useRouter();

  const handleRequire = async (data: FormsState) => {
    const { phone, authentication, password, passwordConfirm } = data;
    const _phone = queryClient.getQueryData<string>(QUERY_KEYS.phone());
    const _authentication = queryClient.getQueryData<string>(QUERY_KEYS.code());

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      throw '비밀번호가 일치하지 않습니다.';
    }

    if (!_phone) {
      setError('휴대폰 인증이 필요합니다.');
      throw '휴대폰 인증이 필요합니다.';
    }

    if (phone !== _phone) {
      setError('휴대폰 인증에 사용하신 번호를 입력해주세요.');
      throw '휴대폰 인증에 사용하신 번호를 입력해주세요.';
    }

    if (!_authentication) {
      setError('인증번호 확인이 필요합니다.');
      throw '인증번호 확인이 필요합니다.';
    }

    if (authentication !== _authentication) {
      setError('인증번호 확인에 사용하신 번호를 입력해주세요.');
      throw '인증번호 확인에 사용하신 번호를 입력해주세요.';
    }
  };

  const onSubmit = React.useCallback(
    (data: FormsState) => {
      const { id: _id, phone, authentication, password } = data;

      if (process === 'password') {
        setId(id);
        setProcess('result-password');
      } else if (process === 'result-password')
        resetPasswordMutation.mutate(
          {
            phone,
            authentication,
            id,
            password,
          },
          {
            onSuccess: () => {
              methods.reset();
              onOpen(
                <Modal
                  title="비밀번호가 재설정 되었습니다."
                  description="새로운 비밀번호로 로그인해보세요!"
                  clickText="확인"
                  background="rgba(30, 30, 32, 0.5)"
                  onCancel={() => {
                    onClose();
                    replace('/auth/signin');
                  }}
                  onClick={() => {
                    onClose();
                    replace('/auth/signin');
                  }}
                />
              );
            },
          }
        );
    },
    [process, resetPasswordMutation, id, methods, onOpen, onClose, replace]
  );

  React.useEffect(() => {
    return () => {
      queryClient.resetQueries(QUERY_KEYS.all);
    };
  }, []);

  return (
    <FormProvider {...methods}>
      <Form
        css={style.form}
        onSubmit={methods.handleSubmit((data) =>
          handleRequire(data).then(() => {
            onSubmit(data);
          })
        )}
      >
        {forms[process].map((form) => (
          <FormLabel key={form.htmlFor} name={form.htmlFor} label={form.label}>
            <AuthFormItem {...form} />
          </FormLabel>
        ))}
        {error && <Alert title={error} severity="error" />}
        <Button width="340px" type="submit" variant="Primary">
          {resetPasswordMutation.isLoading ? '확인중..' : '확인'}
        </Button>
      </Form>
    </FormProvider>
  );
};

export default FindPasswordForm;
