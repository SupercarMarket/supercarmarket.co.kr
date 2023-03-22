import { ErrorCode, fetcher } from '@supercarmarket/lib';
import { Alert, Button, Form } from '@supercarmarket/ui';
import { Modal } from 'components/common/modal';
import inquiry, { InquiryADFormState } from 'constants/inquiry';
import ModalContext from 'feature/modalContext';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from 'styled-components';
import { useRouter } from 'next/navigation';

import InquiryFormItem from '../inquiryFormItem';

const PartnershipForm = () => {
  const session = useSession();
  const [error, setError] = React.useState<string | null>(null);
  const { onClose, onOpen } = React.useContext(ModalContext);
  const { replace } = useRouter();
  const methods = useForm<InquiryADFormState>();

  const handleModal = React.useCallback(
    (href: string) => {
      onClose(() => {
        replace(href);
      });
    },
    [onClose, replace]
  );

  const handleRequire = async (data: InquiryADFormState) => {
    Object.entries(data).map(([key, value]) => {
      if (!value) {
        methods.setError(key as keyof InquiryADFormState, {
          message: '빈 칸을 입력해주세요.',
        });
        throw `${key} is require`;
      }
      if (!value.length) {
        methods.setError(key as keyof InquiryADFormState, {
          message: '파일을 첨부 해주세요.',
        });
        throw `${key} is require`;
      }
    });
  };

  const onSubmit = methods.handleSubmit((data) =>
    handleRequire(data).then(async () => {
      setError(null);

      const { files, ...rest } = data;

      const formData = new FormData();

      formData.append(
        'adRegDto',
        new Blob([JSON.stringify({ ...rest })], { type: 'application/json' })
      );

      files.forEach((file) => formData.append('file', file));

      const response = await fetcher(
        '/server/supercar/v1/inquiry-advertisement',
        {
          method: 'POST',
          headers: {
            ACCESS_TOKEN: session.data?.accessToken || '',
          },
          data: formData,
        }
      );

      const result = await response.json();

      if (!result.data) {
        setError(result.message || ErrorCode[result.status]);
        return;
      }

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
  );

  return (
    <FormProvider {...methods}>
      <Form
        encType="multipart/form-data"
        onSubmit={onSubmit}
        css={css`
          display: flex;
          flex-direction: column;
          gap: 24px;
        `}
      >
        {inquiry.register.advertisement.map((d) => (
          <InquiryFormItem
            key={d.htmlFor}
            callback={(d) => console.log(d)}
            {...d}
          />
        ))}
        <Button type="submit" width="104px">
          작성 완료
        </Button>
        {error && <Alert severity="error" title="" />}
      </Form>
    </FormProvider>
  );
};

export default PartnershipForm;
