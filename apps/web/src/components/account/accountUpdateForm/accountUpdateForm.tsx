import {
  Alert,
  applyMediaQuery,
  Button,
  Form,
  FormLabel,
  theme,
} from '@supercarmarket/ui';
import { signOut, useSession } from 'next-auth/react';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from 'styled-components';
import { Modal } from 'components/common/modal';
import AuthFormItem from 'components/auth/authFormItem/authFormItem';
import { useAccountUpdateInfo } from 'http/server/account';
import { form, FormState } from 'constants/form/updateInfo';
import { useQueryClient } from '@tanstack/react-query';
import {
  QUERY_KEYS,
  useDeleteAccount,
  useUpdateAccount,
} from 'http/server/auth';
import { ModalContext } from 'feature/ModalProvider';

interface AccountUpdateFormProps {
  sub: string;
}

const AccountUpdateForm = (props: AccountUpdateFormProps) => {
  const { sub } = props;
  const queryClient = useQueryClient();
  const { onOpen, onClose } = React.useContext(ModalContext);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const { data: session } = useSession();
  const { data: updateInfo } = useAccountUpdateInfo(sub, {
    onError: (error: Error) => {
      setError(error.message);
    },
  });
  const updateAccountMutation = useUpdateAccount({
    onSuccess: () => {
      queryClient.resetQueries(QUERY_KEYS.all);
      setSuccess('개인정보를 수정했습니다.');
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });
  const deleteAccountMuttation = useDeleteAccount({
    onError: (error: Error) => {
      setError(error.message);
    },
  });
  const methods = useForm<FormState>();

  const handleWithdrawal = React.useCallback(async () => {
    setError(null);

    if (!session) return;

    deleteAccountMuttation.mutate(
      {
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
      },
      {
        onSuccess: () => {
          onClose();
          signOut({ redirect: true });
        },
      }
    );
  }, [deleteAccountMuttation, onClose, session]);

  const handleModal = React.useCallback(() => {
    onOpen(
      <Modal
        title="회원 탈퇴"
        description="회원 탈퇴 시, 정보를 복구할 수 없습니다."
        background={theme.color['greyScale-6']}
        closeText="취소"
        clickText="탈퇴하기"
        onClose={() => {
          onClose();
        }}
        onCancel={() => {
          onClose();
        }}
        onClick={handleWithdrawal}
      />
    );
  }, [handleWithdrawal, onClose, onOpen]);

  /**
   * @function handleRequire
   * @description
   * 내 정보 수정하기의 필드는 모두 require 필드가 아님
   * 각 필드마다 입력을 받았을 때, 다른 필드의 입력이 필수인지 아닌지 핸들링하는 함수
   */
  const handleRequire = React.useCallback(
    async (data: FormState) => {
      setError(null);
      setSuccess(null);

      const { authentication } = data;
      const email = queryClient.getQueryData<string>(
        QUERY_KEYS.duplicate('email')
      );
      const nickname = queryClient.getQueryData<string>(
        QUERY_KEYS.duplicate('nickname')
      );
      const phone = queryClient.getQueryData<string>(QUERY_KEYS.phone());

      const isPhoneAuthRequire = phone && !authentication;
      const isNicknameRequire =
        updateInfo?.data.nickname !== data.nickname && !nickname;
      const isEmailRequire = updateInfo?.data.email !== data.email && !email;

      if (isNicknameRequire) {
        methods.setError('nickname', {
          message: '중복검사가 필요합니다.',
        });
        throw '';
      }

      if (isEmailRequire) {
        methods.setError('email', {
          message: '중복검사가 필요합니다.',
        });
        throw '';
      }

      if (isPhoneAuthRequire) {
        methods.setError('authentication', {
          message: '인증번호를 입력해주세요.',
        });
        throw '';
      }
    },
    [methods, queryClient, updateInfo]
  );

  const debouncedSubmit = React.useCallback(
    async (data: FormState) =>
      handleRequire(data).then(() => {
        if (!session?.accessToken) return;

        const formData = {
          ...data,
          code: data.authentication,
        };

        updateAccountMutation.mutate(formData);
      }),
    [handleRequire, session, updateAccountMutation]
  );

  React.useEffect(() => {
    return () => {
      queryClient.resetQueries(QUERY_KEYS.all);
    };
  }, []);

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={methods.handleSubmit((data) => debouncedSubmit(data))}
        encType="multipart/form-data"
        css={css`
          width: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 60px;
          gap: 26px;
          ${applyMediaQuery('mobile')} {
            width: 343px;
            gap: 16px;
          }
        `}
      >
        {updateInfo && (
          <>
            {form.map((f) => (
              <FormLabel key={f.htmlFor} name={f.htmlFor} label={f.label}>
                <AuthFormItem
                  defaultValue={
                    f.htmlFor !== 'authentication'
                      ? updateInfo?.data[f.htmlFor]
                      : undefined
                  }
                  {...f}
                />
              </FormLabel>
            ))}
            <FormLabel label="회원탈퇴">
              <Button type="button" variant="Line" onClick={handleModal}>
                탈퇴하기
              </Button>
            </FormLabel>
            <Button
              type="submit"
              variant="Primary"
              width="340px"
              disabled={updateAccountMutation.isLoading}
            >
              {updateAccountMutation.isLoading ? '수정중..' : '수정하기'}
            </Button>
          </>
        )}
        {success && <Alert title={success} severity="waring" />}
        {error && <Alert title={error} severity="error" />}
      </Form>
    </FormProvider>
  );
};

export default AccountUpdateForm;
