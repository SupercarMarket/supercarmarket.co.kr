import { ErrorCode } from '@supercarmarket/lib';
import { Alert, Button, Form, Wrapper } from '@supercarmarket/ui';
import { Modal } from 'components/common/modal';
import ModalContext from 'feature/modalContext';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from 'styled-components';
import { useRouter } from 'next/navigation';

import InquiryFormItem from '../inquiryFormItem';
import { useDebounce } from '@supercarmarket/hooks';
import { authRequest } from 'http/core';
import { form, type FormState } from 'constants/form/advertisement';

const PartnershipForm = () => {
  const [error, setError] = React.useState<string | null>(null);
  const { onClose, onOpen } = React.useContext(ModalContext);
  const { replace } = useRouter();
  const methods = useForm<FormState>();

  const handleModal = React.useCallback(
    (href: string) => {
      onClose(() => {
        replace(href);
      });
    },
    [onClose, replace]
  );

  const handleRequire = async (data: FormState) => {
    Object.entries(data).map(([key, value]) => {
      const target = key as keyof FormState;

      if (!value) {
        methods.setError(target, {
          message: '빈 칸을 입력해주세요.',
        });
        throw `${key} is require`;
      }

      if (target === 'files' && !value.length) {
        methods.setError(target, {
          message: '파일을 첨부 해주세요.',
        });
        throw `${key} is require`;
      }
    });
  };

  const debouncedSubmit = useDebounce(
    (data: FormState) =>
      handleRequire(data).then(async () => {
        setError(null);

        const { files, ...rest } = data;

        const formData = new FormData();

        formData.append(
          'adRegDto',
          new Blob([JSON.stringify({ ...rest })], { type: 'application/json' })
        );

        files.forEach((file) => formData.append('file', file));

        await authRequest('/inquiry-advertisement', {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: formData,
        })
          .then(() => {
            onOpen(
              <Modal
                title="광고 문의"
                description="광고 문의가 등록 완료되었습니다."
                clickText="확인"
                background="rgba(30, 30, 32, 0.5)"
                onCancel={() => handleModal('/inquiry')}
                onClick={() => handleModal('/')}
                onClose={() => handleModal('/inquiry')}
              />
            );
          })
          .catch((error) => {
            setError(error.message || ErrorCode[error.status]);
          });
      }),
    300
  );

  return (
    <FormProvider {...methods}>
      <Form
        encType="multipart/form-data"
        onSubmit={methods.handleSubmit((data) => debouncedSubmit(data))}
        css={css`
          display: flex;
          flex-direction: column;
          gap: 24px;
        `}
      >
        {form.map((d) => (
          <InquiryFormItem key={d.htmlFor} {...d} />
        ))}
        <Wrapper.Item
          css={css`
            width: 100%;
            display: flex;
            justify-content: flex-end;
          `}
        >
          <Button type="submit" width="104px">
            {methods.formState.isSubmitting ? '등록 중..' : '작성 완료'}
          </Button>
        </Wrapper.Item>
        {error && <Alert severity="error" title="" />}
      </Form>
    </FormProvider>
  );
};

export default PartnershipForm;
