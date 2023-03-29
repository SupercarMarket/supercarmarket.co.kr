'use client';

import { Alert, Button, Divider, Form, FormLabel } from '@supercarmarket/ui';
import auth, { FormState } from 'constants/auth';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import AuthFormItem from '../authFormItem/authFormItem';
import * as style from './signupForm.styled';
import ModalContext from 'feature/modalContext';
import TermModal from 'components/common/modal/termModal';
import useAuth from 'hooks/useAuth';
import { Modal } from 'components/common/modal';
import { useDebounce } from '@supercarmarket/hooks';

const SignupForm = () => {
  const { replace } = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const { onOpen, onClose } = React.useContext(ModalContext);
  const methods = useForm<FormState>();
  const { authState, duplicate, sendPhone, sendCode, signUp, resetField } =
    useAuth();

  const handleModal = React.useCallback(
    (htmlFor: keyof FormState) => {
      if (htmlFor === 'service')
        return onOpen(
          <TermModal
            title="이용약관"
            htmlFor={htmlFor}
            onClose={() => onClose()}
          />
        );
      return onOpen(
        <TermModal
          title="이용약관"
          htmlFor={htmlFor}
          onClose={() => onClose()}
        />
      );
    },
    [onClose, onOpen]
  );

  const handleRequire = async (data: FormState) => {
    setError(null);

    const { id, nickname, email, phone, authentication } = data;
    const {
      id: _id,
      nickname: _nickname,
      email: _email,
      phone: _phone,
      authentication: _authentication,
    } = authState;

    if (!(_id.success && _nickname.success && _email.success)) {
      setError('중복검사가 필요합니다.');
      throw '중복검사가 필요합니다.';
    }

    if (
      _id.success !== id ||
      _nickname.success !== nickname ||
      _email.success !== email
    ) {
      setError('중복검사에 사용한 값을 입력해주세요.');
      throw '중복검사에 사용한 값을 입력해주세요.';
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

  const debouncedSubmit = useDebounce(async (data: FormState) => {
    await signUp(data)
      .then(() => {
        onOpen(
          <Modal
            title="회원가입 성공 🎉🎊"
            description="Welcome to 슈퍼카마켓"
            background="rgba(30, 30, 32, 0.5)"
            onCancel={() => {
              onClose();
              replace('/auth/signin');
            }}
            clickText="로그인"
            onClick={() => {
              onClose();
              replace('/auth/signin');
            }}
          />
        );
      })
      .catch((error) => setError(error.message));
  }, 300);

  React.useEffect(() => {
    return () => resetField();
  }, []);

  return (
    <FormProvider {...methods}>
      <Form
        css={style.form}
        onSubmit={methods.handleSubmit((data) =>
          handleRequire(data).then(() => {
            debouncedSubmit(data);
          })
        )}
      >
        {auth.signup().map((props) => (
          <React.Fragment key={props.htmlFor}>
            <FormLabel
              name={props.htmlFor}
              label={props.label}
              paddingTop={props.htmlFor}
            >
              <AuthFormItem
                key={props.htmlFor}
                state={authState}
                duplicate={duplicate}
                sendPhone={sendPhone}
                sendCode={sendCode}
                handleModal={handleModal}
                {...props}
              />
            </FormLabel>
            {props.htmlFor === 'email' && (
              <Divider width="100%" height="1px" color="#EAEAEC" />
            )}
          </React.Fragment>
        ))}
        {error && <Alert severity="error" title={error} />}
        <Button width="340px" type="submit" variant="Primary">
          가입하기
        </Button>
      </Form>
    </FormProvider>
  );
};

export default SignupForm;
