import * as React from 'react';
import { Alert, Button, Form, FormLabel } from '@supercarmarket/ui';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import AuthFormItem from '../authFormItem/authFormItem';
import * as style from '../signupForm/signupForm.styled';
import { useQueryClient } from '@tanstack/react-query';
import {
  QUERY_KEYS,
  useFindId,
  useSendCode,
  useSendPhone,
} from 'http/server/auth';
import { form } from 'constants/form/findId';

interface FormsState {
  name: string;
  phone: string;
  authentication: string;
}

const FindIdForm = () => {
  const queryClient = useQueryClient();
  const methods = useForm<FormsState>();
  const findIdMutation = useFindId({
    onError: (error: Error) => {
      setError(error.message);
    },
  });
  const [error, setError] = React.useState<string | null>(null);
  const { replace } = useRouter();
  const sendPhoneMutation = useSendPhone();
  const sendCodeMutation = useSendCode();

  const handleRequire = async (data: FormsState) => {
    const { phone, authentication, name } = data;
    const _phone = queryClient.getQueryData<string>(QUERY_KEYS.phone());
    const _authentication = queryClient.getQueryData<string>(QUERY_KEYS.code());

    if (!name) {
      setError('이름을 입력해주세요.');
      throw '이름을 입력해주세요.';
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
      const { phone, authentication, name } = data;

      findIdMutation.mutate(
        {
          phone,
          authentication,
          name,
        },
        {
          onSuccess: () => {
            methods.reset();
            replace('/auth/find-result-id');
          },
        }
      );
    },
    [findIdMutation, methods, replace]
  );

  React.useEffect(() => {
    queryClient.resetQueries(QUERY_KEYS.all);
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
        {form.map((form) => (
          <FormLabel key={form.htmlFor} name={form.htmlFor} label={form.label}>
            <AuthFormItem
              {...form}
              sendCodeMutation={sendCodeMutation}
              sendPhoneMutation={sendPhoneMutation}
            />
          </FormLabel>
        ))}
        {error && <Alert title={error} severity="error" />}
        <Button width="340px" type="submit" variant="Primary">
          {findIdMutation.isLoading ? '확인중..' : '확인'}
        </Button>
      </Form>
    </FormProvider>
  );
};

export default FindIdForm;
