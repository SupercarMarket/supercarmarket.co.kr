import { Alert, Button, Form, FormLabel } from '@supercarmarket/ui';
import auth, { Forms } from 'constants/auth';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import AuthFormItem from '../authFormItem/authFormItem';
import * as style from '../signupForm/signupForm.styled';
import useAuth from 'hooks/useAuth';
import ResultId from '../resultId';
import ModalContext from 'feature/modalContext';
import { Modal } from 'components/common/modal';

interface FindForms {
  id: () => Forms[];
  password: () => Forms[];
  'result-password': () => Forms[];
}

const forms: FindForms = {
  id: auth.findId,
  password: auth.findPassword,
  'result-password': auth.resultPassword,
};

interface FormsState {
  id: string;
  name: string;
  phone: string;
  password: string;
  passwordConfirm: string;
  authentication: string;
}

interface FindFormProps {
  type: 'id' | 'password' | 'result-password';
}

const FindForm = ({ type }: FindFormProps) => {
  const methods = useForm<FormsState>();
  const [error, setError] = React.useState<string | null>(null);
  const { onOpen, onClose } = React.useContext(ModalContext);
  const {
    authState,
    sendPhone,
    sendCode,
    findId,
    findPassword,
    resetPassword,
    resetField,
  } = useAuth();
  const { replace } = useRouter();

  const handleRequire = async (data: FormsState) => {
    const { phone, authentication, password, passwordConfirm } = data;
    const {
      phone: _phone,
      authentication: _authentication,
      id: _id,
    } = authState;

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      throw '비밀번호가 일치하지 않습니다.';
    }

    if (!_phone.success) {
      setError('휴대폰 인증이 필요합니다.');
      throw '휴대폰 인증이 필요합니다.';
    }

    if (phone !== _phone.success) {
      setError('휴대폰 인증에 사용하신 번호를 입력해주세요.');
      throw '휴대폰 인증에 사용하신 번호를 입력해주세요.';
    }

    if (!_authentication.success) {
      setError('인증번호 확인이 필요합니다.');
      throw '인증번호 확인이 필요합니다.';
    }

    if (authentication !== _authentication.success) {
      setError('인증번호 확인에 사용하신 번호를 입력해주세요.');
      throw '인증번호 확인에 사용하신 번호를 입력해주세요.';
    }
  };

  const onSubmit = React.useCallback(
    (data: FormsState) => {
      const { id, name, phone, authentication, password } = data;

      if (type === 'id')
        findId({ name, phone, authentication }).catch((error) => {
          setError(error.message);
        });
      else if (type === 'password')
        findPassword(id).then(() => {
          replace('/auth/find?type=result-password');
        });
      else if (type === 'result-password')
        resetPassword({
          phone,
          authentication,
          id: authState.id.success || '',
          password,
        })
          .then(() => {
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
          })
          .catch((error) => {
            setError(error.message);
          });
    },
    [
      type,
      authState.id.success,
      resetPassword,
      findId,
      findPassword,
      onClose,
      onOpen,
      replace,
    ]
  );

  React.useEffect(() => {
    if (
      type === 'result-password' &&
      !(authState.authentication.success && authState.phone.success)
    )
      replace('/auth/signin');
  }, [
    authState.authentication.success,
    authState.phone.success,
    replace,
    type,
  ]);

  React.useEffect(() => {
    return () => resetField();
  }, []);

  return (
    <FormProvider {...methods}>
      {!authState.findIdResult.success && (
        <Form
          css={style.form}
          onSubmit={methods.handleSubmit((data) =>
            handleRequire(data).then(() => {
              onSubmit(data);
            })
          )}
        >
          {forms[type]().map((form) => (
            <FormLabel
              key={form.htmlFor}
              name={form.htmlFor}
              label={form.label}
            >
              <AuthFormItem
                state={authState}
                sendPhone={sendPhone}
                sendCode={sendCode}
                {...form}
              />
            </FormLabel>
          ))}
          {error && <Alert title={error} severity="error" />}
          <Button width="340px" type="submit" variant="Primary">
            확인
          </Button>
        </Form>
      )}
      {authState.findIdResult.success && (
        <ResultId authState={authState} resetField={resetField} />
      )}
    </FormProvider>
  );
};

export default FindForm;
