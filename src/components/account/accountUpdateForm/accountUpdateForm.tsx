import Button from 'components/common/button';
import { Form } from 'components/common/form';
import type { FormState } from 'constants/account';
import account from 'constants/account';
import { update } from 'feature/actions/authActions';
import { useAuthDispatch, useAuthState } from 'feature/authProvider';
import useUpdateInfo from 'hooks/queries/useUpdateInfo';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from 'styled-components';
import { clientApi } from 'utils/api/fetcher';

import AccountFormItem from '../accountFormItem';

const AccountUpdateForm = () => {
  const { data: session } = useSession();
  const { data: updateInfo } = useUpdateInfo(session?.accessToken as string);
  const methods = useForm<FormState>();
  const state = useAuthState();
  const dispatch = useAuthDispatch();

  // console.log('info : ', updateInfo);

  /**
   * @function handleRequire
   * @description
   * 내 정보 수정하기의 필드는 모두 require 필드가 아님
   * 각 필드마다 입력을 받았을 때, 다른 필드의 입력이 필수인지 아닌지 핸들링하는 함수
   */
  const handleRequire = (data: FormState) => {
    const { phone, authentication, password, newPassword, newPasswordConfirm } =
      data;

    if (!password) return '';

    // * 폰 값이 있을 때 인증도 있어야 한다.
    const isPhoneValue = !!(
      state.phone.data &&
      phone &&
      state.authentication.data &&
      authentication
    );

    const isNewPasswordValue = !!(newPassword && newPasswordConfirm);

    if (isNewPasswordValue) return '새 비밀번호를 입력해주세요.';
  };

  const onSubmit = methods.handleSubmit(async (data) => {
    const { gallery, background, ...rest } = data;

    const formData = new FormData();

    // formData.append('changeUserInfoDto', JSON.stringify(rest));
    formData.append(
      'changeUserInfoDto',
      new Blob([JSON.stringify(rest)], { type: 'application/json' })
    );
    formData.append('background', background);
    gallery.forEach((file) => {
      formData.append('gallery', file);
    });

    formData.forEach((v, k) => {
      console.log(k, ' : ', v);
    });

    const response = await fetch(`/server/supercar/v1/mypage`, {
      method: 'PATCH',
      headers: {
        ACCESS_TOKEN: session?.accessToken as string,
      },
      body: formData,
    });

    console.log(response);
  });
  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={onSubmit}
        css={css`
          width: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 60px;
          gap: 26px;
        `}
      >
        {account.forms.map((form) => (
          <AccountFormItem
            key={form.htmlFor}
            state={state}
            dispatch={dispatch}
            {...form}
          />
        ))}
        <Button type="submit" variant="Primary" width="340px">
          수정하기
        </Button>
      </Form>
    </FormProvider>
  );
};

export default AccountUpdateForm;
