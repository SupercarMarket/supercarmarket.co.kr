import { Alert, Button, Form, FormLabel } from '@supercarmarket/ui';
import { ErrorCode } from '@supercarmarket/lib';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { signIn } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';
import AuthFormItem from '../authFormItem/authFormItem';
import * as style from '../signupForm/signupForm.styled';
import { form, type FormState } from 'constants/form/findId';
import { QUERY_KEYS, useSendCode, useSendPhone } from 'http/server/auth';
import { useQueryClient } from '@tanstack/react-query';

interface PhoneFormProps {
  uuid: string;
}

const PhoneForm = ({ uuid }: PhoneFormProps) => {
  const methods = useForm<FormState>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { replace } = useRouter();
  const queryClient = useQueryClient();
  const sendPhoneMutation = useSendPhone();
  const sendCodeMutation = useSendCode();

  const handleRequire = async (data: FormState) => {
    setError(null);
    setLoading(false);

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

  const onSubmit = methods.handleSubmit((data) =>
    handleRequire(data).then(async () => {
      const { phone, authentication, name } = data;

      setLoading(true);

      const response = await signIn('Phone', {
        name,
        phone,
        authentication,
        uuid,
        redirect: false,
      });

      setLoading(false);

      if (!response) setError(ErrorCode[450]);
      else if (response.ok) replace('/');
      else setError(ErrorCode[450]);
    })
  );
  return (
    <FormProvider {...methods}>
      <Form css={style.form} onSubmit={onSubmit}>
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
        <Button type="submit" fullWidth disabled={loading}>
          인증
        </Button>
      </Form>
    </FormProvider>
  );
};

export default PhoneForm;
