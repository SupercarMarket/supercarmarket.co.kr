import * as React from 'react';
import { Alert, Button, Form, Wrapper } from '@supercarmarket/ui';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from 'styled-components';
import InquiryFormItem from '../inquiryFormItem';
import { Modal } from 'components/common/modal';
import { useDebounce } from '@supercarmarket/hooks';
import { form, type FormState } from 'constants/form/sale';
import { useRegisterSale } from 'http/server/inquiry';
import { ModalContext } from 'feature/ModalProvider';
import { useAccountUpdateInfo } from 'http/server/account';
import { useSession } from 'next-auth/react';

const SaleForm = () => {
  const methods = useForm<FormState>();
  const { onOpen, onClose } = React.useContext(ModalContext);
  const [error, setError] = React.useState<string | null>(null);
  const { replace } = useRouter();
  const { data: session, status } = useSession();
  const { data } = useAccountUpdateInfo(session?.sub || '', {
    enabled: !!session,
  });
  const saleMutation = useRegisterSale({
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const handleRequire = async (data: FormState) => {
    Object.entries(data).forEach(([key, value]) => {
      const target = key as keyof FormState;

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

  const debouncedSubmit = useDebounce(
    async (data: FormState) =>
      handleRequire(data).then(async () => {
        const { productImages, attachments, ...rest } = data;
        const formData = new FormData();
        formData.append(
          'productRegDto',
          new Blob(
            [
              JSON.stringify({
                ...rest,
                accidentHistory:
                  rest.accidentHistory === '무사고' ? false : true,
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

        saleMutation.mutate(formData, {
          onSuccess: () => {
            onOpen(
              <Modal
                title="판매차량 등록 문의"
                description="판매차량 등록 문의가 완료되었습니다."
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
          },
        });
      }),
    300
  );

  React.useEffect(() => {
    if (
      (status !== 'loading' && status !== 'authenticated') ||
      (data && data.data.role !== 'dealer')
    )
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
  }, [data, onClose, onOpen, replace, status]);

  console.log(data);

  return (
    <FormProvider {...methods}>
      <Form
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
            {saleMutation.isLoading ? '등록 중..' : '작성 완료'}
          </Button>
        </Wrapper.Item>
        {error && <Alert title={error} severity="error" />}
      </Form>
    </FormProvider>
  );
};

export default SaleForm;
