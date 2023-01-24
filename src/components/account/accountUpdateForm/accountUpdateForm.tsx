import Button from 'components/common/button';
import { Form } from 'components/common/form';
import type { FormState } from 'constants/account';
import account from 'constants/account';
import { useAuthDispatch, useAuthState } from 'feature/authProvider';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from 'styled-components';

import AccountFormItem from '../accountFormItem';

const AccountUpdateForm = () => {
  const methods = useForm<FormState>();
  const state = useAuthState();
  const dispatch = useAuthDispatch();

  /**
   * @function handleRequire
   * @description
   * 내 정보 수정하기의 필드는 모두 require 필드가 아님
   * 각 필드마다 입력을 받았을 때, 다른 필드의 입력이 필수인지 아닌지 핸들링하는 함수
   */
  const handleRequire = (data: FormState) => {
    const { phone, authentication, password } = data;

    const isPhoneValue = !!(state.phone.data && phone);

    // * 폰 값이 있을 때 인증도 있어야 한다.
    if (isPhoneValue) return !!(state.authentication.data && authentication);
  };

  const onSubmit = methods.handleSubmit((data) => {
    handleRequire(data);
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
          <AccountFormItem key={form.htmlFor} {...form} />
        ))}
        <Button type="submit" variant="Primary" width="340px">
          수정하기
        </Button>
      </Form>
    </FormProvider>
  );
};

export default AccountUpdateForm;
