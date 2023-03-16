'use client';

import { Alert, Button, Form, FormLabel, theme } from '@supercarmarket/ui';
import type { FormState } from 'constants/account';
import account from 'constants/account';
import { update } from 'feature/actions/authActions';
import { useAuthDispatch, useAuthState } from 'feature/authProvider';
import useUpdateInfo from 'hooks/queries/useUpdateInfo';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from 'styled-components';

import AccountFormItem from '../accountFormItem';
import ModalContext from 'feature/modalContext';
import { Modal } from 'components/common/modal';
import { clientFetcher } from '@supercarmarket/lib';

const AccountUpdateForm = () => {
  const { onOpen, onClose } = React.useContext(ModalContext);
  const [error, setError] = React.useState<string | null>(null);
  const { data: session } = useSession();
  const { data: updateInfo, refetch } = useUpdateInfo(
    session?.accessToken as string
  );
  const { replace } = useRouter();
  const methods = useForm<FormState>();
  const state = useAuthState();
  const dispatch = useAuthDispatch();

  const handleWithdrawal = React.useCallback(async () => {
    setError(null);

    if (!session) return;

    const response = await clientFetcher('/server', {
      method: 'DELETE',
      headers: {
        ACCESS_TOKEN: session.accessToken,
        REFRESH_TOKEN: session.refreshToken,
      },
    }).catch((error) => {
      setError(error.message);
    });

    if (!response?.data) return;

    onClose();
    signOut({ redirect: true });
  }, [onClose, session]);

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
  const handleRequire = (data: FormState) => {
    const { authentication } = data;

    return new Promise((resolve, reject) => {
      const isPhoneAuthRequire = state.phone.data && !authentication;
      const isNicknameRequire =
        updateInfo?.data.nickname !== data.nickname && !state.nickname.data;
      const isEmailRequire =
        updateInfo?.data.email !== data.email && !state.email.data;

      if (isNicknameRequire) {
        methods.setError('nickname', {
          message: '중복검사가 필요합니다.',
        });
        reject();
      }

      if (isEmailRequire) {
        methods.setError('email', {
          message: '중복검사가 필요합니다.',
        });
        reject();
      }

      if (isPhoneAuthRequire) {
        methods.setError('authentication', {
          message: '인증번호를 입력해주세요.',
        });
        reject();
      }

      resolve(true);
    });
  };

  const onSubmit = methods.handleSubmit((data) =>
    handleRequire(data).then(() => {
      if (!session?.accessToken) return;

      const formData = {
        ...data,
        code: data.authentication,
      };

      update(dispatch, formData, session.accessToken).then(() => {
        refetch();
      });
    })
  );

  React.useEffect(() => {
    if (state.update.data) return replace('/');
  }, [replace, state.update.data]);

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={onSubmit}
        encType="multipart/form-data"
        css={css`
          width: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 60px;
          gap: 26px;
        `}
      >
        {updateInfo && (
          <>
            {account.update.map((form) => (
              <AccountFormItem
                key={form.htmlFor}
                defaultValue={
                  form.htmlFor !== 'authentication'
                    ? updateInfo?.data[form.htmlFor]
                    : undefined
                }
                state={state}
                dispatch={dispatch}
                {...form}
              />
            ))}
            <FormLabel label="회원탈퇴">
              <Button type="button" variant="Line" onClick={handleModal}>
                탈퇴하기
              </Button>
            </FormLabel>
            <Button type="submit" variant="Primary" width="340px">
              수정하기
            </Button>
          </>
        )}
        {state.update.error && (
          <Alert title={state.update.error.message} severity="error" />
        )}
        {error && <Alert title={error} severity="error" />}
      </Form>
    </FormProvider>
  );
};

export default AccountUpdateForm;
