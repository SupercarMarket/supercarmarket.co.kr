import * as React from 'react';
import { Alert, Button, Form, Wrapper } from '@supercarmarket/ui';
import { Modal } from 'components/common/modal';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from 'styled-components';
import { useRouter } from 'next/navigation';

import InquiryFormItem from '../inquiryFormItem';
import { useDebounce } from '@supercarmarket/hooks';
import { form, type FormState } from 'constants/form/misc';
import { useRegisterMisc } from 'http/server/inquiry';
import { ModalContext } from 'feature/ModalProvider';

const MiscForm = () => {
  const { onClose, onOpen } = React.useContext(ModalContext);
  const { replace } = useRouter();
  const methods = useForm<FormState>();
  const [error, setError] = React.useState<string | null>(null);
  const miscMutation = useRegisterMisc({
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const handleModal = React.useCallback(
    (href: string) => {
      onClose(() => {
        replace(href);
      });
    },
    [onClose, replace]
  );

  const handleRequire = async (data: FormState) => {
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
    (data: FormState) =>
      handleRequire(data).then(async () => {
        setError(null);

        const { title, contents } = data;

        miscMutation.mutate(
          { title, contents },
          {
            onSuccess: () => {
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
            },
          }
        );
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
            {miscMutation.isLoading ? '등록 중..' : '작성 완료'}
          </Button>
        </Wrapper.Item>
        {error && <Alert severity="error" title="" />}
      </Form>
    </FormProvider>
  );
};

export default MiscForm;
