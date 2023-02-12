'use client';

import Alert from 'components/common/alert';
import Button from 'components/common/button';
import { Form } from 'components/common/form';
import inquiry, { InquiryDealerFormState } from 'constants/inquiry';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from 'styled-components';
import fetcher from 'utils/api/fetcher';
import { ErrorCode } from 'utils/error';

import InquiryFormItem from '../inquiryFormItem';

const DealerForm = () => {
  const session = useSession();
  const methods = useForm<InquiryDealerFormState>();
  const [error, setError] = React.useState<string | null>(null);
  const { push } = useRouter();

  const handleRequire = (data: InquiryDealerFormState) => {
    const { addional: _, ...rest } = data;

    return new Promise((resolve, reject) => {
      Object.entries(rest).forEach(([key, value]) => {
        if (!value) {
          methods.setError(key as keyof InquiryDealerFormState, {
            message: '빈 칸을 입력해주세요.',
          });
          reject();
        }
        if (!value.length) {
          methods.setError(key as keyof InquiryDealerFormState, {
            message: '파일을 첨부 해주세요.',
          });
          reject();
        }
      });
      resolve(true);
    });
  };

  const onSubmit = methods.handleSubmit((d) =>
    handleRequire(d).then(async () => {
      setError(null);

      const formData = new FormData();
      const {
        comAddress,
        addional,
        employeeCardBack,
        employeeCardFront,
        profileImage,
        regImage,
        ...rest
      } = d;
      const [zipcode, address, addressDetail] = comAddress;

      formData.append(
        'dealerRequestDto',
        new Blob(
          [
            JSON.stringify({
              ...rest,
              additional: addional || null,
              comAddress: {
                zipcode,
                detail: `${address} ${addressDetail}`,
              },
            }),
          ],
          { type: 'application/json' }
        )
      );
      employeeCardBack.forEach((file) =>
        formData.append('employeeCardBack', file)
      );
      employeeCardFront.forEach((file) =>
        formData.append('employeeCardFront', file)
      );
      profileImage.forEach((file) => formData.append('profileImage', file));
      regImage.forEach((file) => formData.append('regImage', file));

      const response = await fetcher('/server/supercar/v1/inquiry-dealer', {
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
        encType="multipart/form-data"
        onSubmit={onSubmit}
        css={css`
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 24px;
        `}
      >
        {inquiry.register.dealer.map((d) => (
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

export default DealerForm;
