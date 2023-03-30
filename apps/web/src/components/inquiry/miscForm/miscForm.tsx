import { ErrorCode } from '@supercarmarket/lib';
import { Alert, Button, Form, Wrapper } from '@supercarmarket/ui';
import { Modal } from 'components/common/modal';
import inquiry, { InquiryMiscFormState } from 'constants/inquiry';
import ModalContext from 'feature/modalContext';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from 'styled-components';
import { useRouter } from 'next/navigation';

import InquiryFormItem from '../inquiryFormItem';
import { useDebounce } from '@supercarmarket/hooks';
import { authRequest } from 'http/core';

const MiscForm = () => {
  const session = useSession();
  const { onClose, onOpen } = React.useContext(ModalContext);
  const { replace } = useRouter();
  const methods = useForm<InquiryMiscFormState>();
  const [error, setError] = React.useState<string | null>(null);

  const handleModal = React.useCallback(
    (href: string) => {
      onClose(() => {
        replace(href);
      });
    },
    [onClose, replace]
  );

  const handleRequire = async (data: InquiryMiscFormState) => {
    const { title, contents } = data;

    if (!title) {
      methods.setError('title', { message: '제목을 입력해주세요' });
      throw 'title is require';
    }

    if (!contents) {
      methods.setError('contents', { message: '내용을 입력해주세요' });
      throw 'contents is require';
    }
  };

  const debouncedSubmit = useDebounce(
    (data: InquiryMiscFormState) =>
      handleRequire(data).then(async () => {
        setError(null);

        const { title, contents } = data;

        await authRequest('/inquiry-etc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ACCESS_TOKEN: session.data?.accessToken || '',
          },
          data: { title, contents },
        })
          .then(() => {
            onOpen(
              <Modal
                title="기타 문의"
                description="기타 문의가 등록 완료되었습니다."
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
        onSubmit={methods.handleSubmit((data) => {
          debouncedSubmit(data);
        })}
        css={css`
          display: flex;
          flex-direction: column;
          gap: 24px;
        `}
      >
        {inquiry.register.misc.map((d) => (
          <InquiryFormItem
            key={d.htmlFor}
            callback={(d) => console.log(d)}
            {...d}
          />
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

export default MiscForm;
