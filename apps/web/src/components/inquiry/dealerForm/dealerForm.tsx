'use client';

import { Alert, Button, Form } from '@supercarmarket/ui';
import { ErrorCode } from '@supercarmarket/lib';
import inquiry, { InquiryDealerFormState } from 'constants/inquiry';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from 'styled-components';

import InquiryFormItem from '../inquiryFormItem';
import ModalContext from 'feature/modalContext';
import { Modal } from 'components/common/modal';
import { useDebounce } from '@supercarmarket/hooks';
import { authRequest } from 'http/core';

const DealerForm = () => {
  const methods = useForm<InquiryDealerFormState>();
  const { onOpen, onClose } = React.useContext(ModalContext);
  const [error, setError] = React.useState<string | null>(null);
  const { replace } = useRouter();

  const handleRequire = async (data: InquiryDealerFormState) => {
    const { addional: _, ...rest } = data;

    Object.entries(rest).forEach(([key, value]) => {
      const target = key as keyof InquiryDealerFormState;

      if (target === 'comAddress' && !value) {
        methods.setError(target, {
          message: '상사 주소를 입력해주세요.',
        });
        throw 'comAddress is require';
      }

      if (
        (target === 'regImage' ||
          target === 'employeeCardBack' ||
          target === 'employeeCardFront' ||
          target === 'profileImage') &&
        !value.length
      ) {
        methods.setError(target, {
          message: '파일을 첨부 해주세요.',
        });
        throw 'file is require';
      }

      if (!value) {
        methods.setError(target, {
          message: '빈 칸을 입력해주세요.',
        });
        throw 'value is require';
      }
    });
    return;
  };

  const debouncedSubmit = useDebounce(
    async (data: InquiryDealerFormState) =>
      handleRequire(data).then(async () => {
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
        } = data;
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

        await authRequest('/inquiry-dealer', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: formData,
        })
          .then(() => {
            onOpen(
              <Modal
                title="딜러 등록 문의"
                description="딜러 등록 문의가 완료되었습니다."
                clickText="확인"
                background="rgba(30, 30, 32, 0.5)"
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
          align-items: flex-end;
          gap: 24px;
        `}
      >
        {inquiry.register.dealer.map((data) => (
          <InquiryFormItem key={data.htmlFor} {...data} />
        ))}
        <Button type="submit" width="104px">
          {methods.formState.isSubmitting ? '등록 중..' : '작성 완료'}
        </Button>
        {error && <Alert title={error} severity="error" />}
      </Form>
    </FormProvider>
  );
};

export default DealerForm;
