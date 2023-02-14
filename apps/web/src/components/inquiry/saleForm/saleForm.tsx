'use client';

import { Alert, Button, Form } from '@supercarmarket/ui';
import { fetcher, ErrorCode } from '@supercarmarket/lib';
import inquiry, { InquiryCarFormState } from 'constants/inquiry';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from 'styled-components';

import InquiryFormItem from '../inquiryFormItem';

const SaleForm = () => {
  const methods = useForm<InquiryCarFormState>();
  const session = useSession();
  const [error, setError] = React.useState<string | null>(null);
  const { push } = useRouter();

  const handleRequire = (data: InquiryCarFormState) => {
    return new Promise((resolve, reject) => {
      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          return;
        }

        if (!value) {
          methods.setError(key as keyof InquiryCarFormState, {
            message: '빈 칸을 입력해주세요.',
          });
          reject();
        }
        if (!value.length) {
          methods.setError(key as keyof InquiryCarFormState, {
            message: '파일을 첨부 해주세요.',
          });
          reject();
        }
      });
      resolve(true);
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
      console.log(data);

      formData.forEach((v, k) => console.log(k, v));

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

      push('/inquiry');
    })
  );
  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={onSubmit}
        css={css`
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
        <Button type="submit" width="104px">
          작성 완료
        </Button>
        {error && <Alert title={error} severity="error" />}
      </Form>
    </FormProvider>
  );
};

export default SaleForm;
