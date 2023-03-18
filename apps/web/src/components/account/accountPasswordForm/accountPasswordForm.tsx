import { clientApi } from '@supercarmarket/lib';
import {
  Alert,
  Button,
  Form,
  FormInput,
  FormLabel,
  FormMessage,
  Wrapper,
} from '@supercarmarket/ui';
import account, { AccountPasswordUpdateFormState } from 'constants/account';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from 'styled-components';
import { useRouter } from 'next/navigation';

interface AccountPasswordFormProps {
  sub: string;
}

const AccountPasswordForm = (props: AccountPasswordFormProps) => {
  const { sub } = props;
  const session = useSession();
  const { replace } = useRouter();
  const methods = useForm<AccountPasswordUpdateFormState>();
  const [error, setError] = useState<string | null>(null);

  const handleRequire = async (data: AccountPasswordUpdateFormState) => {
    const { newPassword, newPasswordCheck } = data;

    if (newPassword !== newPasswordCheck) {
      methods.setError('newPassword', {
        message: '새 비밀번호가 일치하지 않습니다.',
      });
      return;
    }

    return true;
  };

  const handleSubmit = methods.handleSubmit((data) =>
    handleRequire(data).then(async () => {
      setError(null);

      const response = await clientApi(`/server/supercar/v1/user/change-pw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ACCESS_TOKEN: session.data?.accessToken || '',
        },
        data,
      }).catch((error) => {
        setError(error.message);
      });

      if (!response?.data) return;

      replace(`/account/${sub}`);
    })
  );
  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={handleSubmit}
        css={css`
          width: 800px;
          display: flex;
          flex-direction: column;
          gap: 26px;
          margin-top: 60px;
          align-items: center;
          button[type='submit'] {
            width: 340px;
          }
        `}
      >
        {account.updatePassword.map((form) => (
          <FormLabel key={form.htmlFor} name={form.htmlFor} label={form.label}>
            <Wrapper
              css={css`
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 6px;
              `}
            >
              <FormInput
                type={form.type}
                placeholder={form.placeholder}
                {...methods.register(form.htmlFor, form.options)}
              />
              <FormMessage
                tooltip={form.tooltip}
                error={methods.formState.errors[form.htmlFor]?.message}
                padding="0 0 0 14px"
              />
            </Wrapper>
          </FormLabel>
        ))}
        {error && <Alert severity="error" title={error} />}
        <Button type="submit">수정하기</Button>
      </Form>
    </FormProvider>
  );
};

export default AccountPasswordForm;