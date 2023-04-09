import {
  Alert,
  applyMediaQuery,
  Button,
  Form,
  FormInput,
  FormLabel,
  FormMessage,
  Wrapper,
} from '@supercarmarket/ui';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from 'styled-components';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@supercarmarket/hooks';
import { form, FormState } from 'constants/form/updatePassword';
import { authRequest } from 'http/core';

interface AccountPasswordFormProps {
  sub: string;
}

const AccountPasswordForm = (props: AccountPasswordFormProps) => {
  const { sub } = props;
  const { replace } = useRouter();
  const methods = useForm<FormState>();
  const [error, setError] = useState<string | null>(null);

  const handleRequire = async (data: FormState) => {
    const { newPassword, newPasswordCheck } = data;

    if (newPassword !== newPasswordCheck) {
      methods.setError('newPassword', {
        message: '새 비밀번호가 일치하지 않습니다.',
      });
      return;
    }

    return true;
  };

  const debouncedSubmit = useDebounce(
    (data: FormState) =>
      handleRequire(data).then(async () => {
        setError(null);

        const response = await authRequest(
          `/server/supercar/v1/user/change-pw`,
          {
            method: 'POST',
            data,
          }
        ).catch((error) => {
          setError(error.message);
        });

        if (!response?.data) return;

        replace(`/account/${sub}`);
      }),
    300
  );
  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={methods.handleSubmit((data) => debouncedSubmit(data))}
        css={css`
          width: 800px;
          display: flex;
          flex-direction: column;
          gap: 26px;
          align-items: center;
          button[type='submit'] {
            width: 340px;
          }
          ${applyMediaQuery('mobile')} {
            width: 328px;
            gap: 16px;
          }
        `}
      >
        {form.map((f) => (
          <FormLabel key={f.htmlFor} name={f.htmlFor} label={f.label}>
            <Wrapper
              css={css`
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 6px;
              `}
            >
              <FormInput
                type={f.type}
                placeholder={f.placeholder}
                {...methods.register(f.htmlFor, f.options)}
              />
              <FormMessage
                tooltip={f.tooltip}
                error={methods.formState.errors[f.htmlFor]?.message}
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
