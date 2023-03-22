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
import { Profile } from '@supercarmarket/types/account';

interface SaleFormProps {
  role: Profile['role'];
}

const SaleForm = (props: SaleFormProps) => {
  const { role } = props;
  const methods = useForm<InquiryCarFormState>();
  const session = useSession();
  const { onOpen, onClose } = React.useContext(ModalContext);
  const [error, setError] = React.useState<string | null>(null);
  const { replace } = useRouter();

  const handleRequire = async (data: InquiryCarFormState) => {
    Object.entries(data).forEach(([key, value]) => {
      const target = key as keyof InquiryCarFormState;

      if (
        (target === 'category' || target === 'fuel' || target === 'sellType') &&
        !value
      ) {
        methods.setError(target, {
          message: '값을 선택해주세요.',
        });
        throw 'selected is require';
      }

      if (
        (target === 'personalInfoAgree' || target === 'sellClause') &&
        !value
      ) {
        methods.setError(target, {
          message: '동의가 필요합니다.',
        });
        throw 'fileds is require';
      }

      if (target === 'productImages' && !value.length) {
        methods.setError(target, {
          message: '사진을 첨부해주세요.',
        });
        throw 'file is require';
      }

      if (target === 'attachments' && !value.length) {
        methods.setError(target, {
          message: '파일을 첨부해주세요.',
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
          description="로그인 후 이용 가능합니다"
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
  );

  React.useEffect(() => {
    if (!role || role === 'user')
      onOpen(
        <Modal
          title="판매 등록 문의"
          description="딜러 등록 후 서비스 이용 가능합니다."
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
  }, [onClose, onOpen, replace, role]);
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
