'use client';

import { Alert, Button, Form, Wrapper } from '@supercarmarket/ui';
import { fetcher, ErrorCode } from '@supercarmarket/lib';
import inquiry, { InquiryCarFormState } from 'constants/inquiry';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from 'styled-components';

import InquiryFormItem from '../inquiryFormItem';
import ModalContext from 'feature/modalContext';
import { Modal } from 'components/common/modal';

const SaleForm = () => {
  const methods = useForm<InquiryCarFormState>();
  const session = useSession();
  const { onOpen, onClose } = React.useContext(ModalContext);
  const [error, setError] = React.useState<string | null>(null);
  const { replace } = useRouter();

  const handleRequire = async (data: InquiryCarFormState) => {
    Object.entries(data).forEach(([key, value]) => {
      if (!value) {
        methods.setError(key as keyof InquiryCarFormState, {
          message: '빈 칸을 입력해주세요.',
        });
        throw 'value is require';
      }
      if (!value.length) {
        methods.setError(key as keyof InquiryCarFormState, {
          message: '파일을 첨부 해주세요.',
        });
        throw 'file is require';
      }
    });
  };

  const onSubmit = methods.handleSubmit((data) =>
    handleRequire(data).then(async () => {
      const { productImages, attachments, ...rest } = data;
      const formData = new FormData();
      formData.append(
        'productRegDto',
        new Blob(
          [
            JSON.stringify({
              ...rest,
              accidentHistory: rest.accidentHistory === '무사고' ? false : true,
              price: rest.price === '상담' ? '0' : rest.price,
            }),
          ],
          { type: 'application/json' }
        )
      );
      productImages.forEach((file) =>
        formData.append('productImages', file.file)
      );
      attachments.forEach((file) => formData.append('attachments', file));

      const response = await fetcher('/server/supercar/v1/inquiry-product', {
        method: 'POST',
        headers: {
          ACCESS_TOKEN: session.data?.accessToken || '',
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || ErrorCode[response.status]);
        return;
      }

      onOpen(
        <Modal
          title="딜러 등록 문의"
          description="딜러 등록 문의가 완료되었습니다."
          clickText="확인"
          onCancel={() => {
            onClose();
            replace('/inquiry');
          }}
          onClick={() => {
            onClose();
            replace('/inquiry');
          }}
        />
      );
    })
  );
  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={onSubmit}
        css={css`
          width: 1200px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        `}
      >
        {inquiry.register.car.map((d) => (
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
        {error && <Alert title={error} severity="error" />}
      </Form>
    </FormProvider>
  );
};

export default SaleForm;
