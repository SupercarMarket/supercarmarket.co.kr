'use client';

import * as React from 'react';
import { Alert, Button, Divider, Form, FormLabel } from '@supercarmarket/ui';
import { useRouter } from 'next/navigation';
import * as style from './signupForm.styled';
import AuthFormItem from '../authFormItem/authFormItem';
import { FormProvider, useForm } from 'react-hook-form';
import TermModal from 'components/common/modal/termModal';
import { Modal } from 'components/common/modal';
import { useDebounce } from '@supercarmarket/hooks';
import { form, type FormState } from 'constants/form/signup';
import {
  QUERY_KEYS,
  useCreateAccount,
  useSendCode,
  useSendPhone,
} from 'http/server/auth';
import { useQueryClient } from '@tanstack/react-query';
import { ModalContext } from 'feature/ModalProvider';

const SignupForm = () => {
  const queryClient = useQueryClient();
  const { replace } = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const { onOpen, onClose } = React.useContext(ModalContext);
  const methods = useForm<FormState>();
  const sendPhoneMutation = useSendPhone();
  const sendCodeMutation = useSendCode();
  const createAccountMutation = useCreateAccount({
    onSuccess: () => {
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
    },
    onError: (error: Error) => {
      setError(error.message);
    },
    useErrorBoundary: false,
  });

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

    const _id = queryClient.getQueryData<string>(QUERY_KEYS.duplicate('id'));
    const _email = queryClient.getQueryData<string>(
      QUERY_KEYS.duplicate('email')
    );
    const _nickname = queryClient.getQueryData<string>(
      QUERY_KEYS.duplicate('nickname')
    );
    const _phone = queryClient.getQueryData<string>(QUERY_KEYS.phone());
    const _authentication = queryClient.getQueryData<string>(QUERY_KEYS.code());

    const { id, nickname, email, phone, authentication } = data;

    if (!(_id && _nickname && _email)) {
      setError('중복검사가 필요합니다.');
      throw '중복검사가 필요합니다.';
    }

    if (_id !== id || _nickname !== nickname || _email !== email) {
      setError('중복검사에 사용한 값을 입력해주세요.');
      throw '중복검사에 사용한 값을 입력해주세요.';
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

  const debouncedSubmit = useDebounce(async (data: FormState) => {
    await createAccountMutation.mutate(data, {
      onSuccess: () => {
        methods.reset();
      },
    });
  }, 300);

  React.useEffect(() => {
    return () => {
      queryClient.resetQueries({ queryKey: QUERY_KEYS.all });
    };
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
        {form.map((props) => (
          <React.Fragment key={props.htmlFor}>
            <FormLabel
              name={props.htmlFor}
              label={props.label}
              paddingTop={props.htmlFor}
            >
              <AuthFormItem
                key={props.htmlFor}
                handleModal={handleModal}
                sendCodeMutation={sendCodeMutation}
                sendPhoneMutation={sendPhoneMutation}
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
          {createAccountMutation.isLoading ? '가입중..' : '가입하기'}
        </Button>
      </Form>
    </FormProvider>
  );
};

export default SignupForm;
