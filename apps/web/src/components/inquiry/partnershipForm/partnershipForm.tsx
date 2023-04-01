import * as React from 'react';
import { Alert, Button, Form, Wrapper } from '@supercarmarket/ui';
import { Modal } from 'components/common/modal';
import ModalContext from 'feature/modalContext';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from 'styled-components';
import { useRouter } from 'next/navigation';
import InquiryFormItem from '../inquiryFormItem';
import { useDebounce } from '@supercarmarket/hooks';
import { form, type FormState } from 'constants/form/partnership';
import { useRegisterPartnership } from 'http/server/inquiry';

const formatter = (category: string) => {
  if (category === '전체') return 'ALL';
  if (category === '자동차매장') return 'DEALER_SHOP';
  if (category === '공업사') return 'CAR_CENTER';
  if (category === '도색') return 'PAINTING';
  if (category === '디테일링') return 'DETAILING';
  return 'ETC';
};

const PartnershipForm = () => {
  const [error, setError] = React.useState<string | null>(null);
  const { onClose, onOpen } = React.useContext(ModalContext);
  const { replace } = useRouter();
  const methods = useForm<FormState>();
  const partnershipMutation = useRegisterPartnership({
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
    Object.entries(data).map(([key, value]) => {
      const target = key as keyof FormState;

      if (target == 'address' && !value.length) {
        methods.setError(target, {
          message: '주소를 입력 해주세요.',
        });
        throw `${key} is require`;
      }

      if (target === 'category' && !value) {
        methods.setError(target, {
          message: '업종을 선택 해주세요.',
        });
        throw `${key} is require`;
      }

      if (
        (target === 'partnershipAttachment' ||
          target === 'partnershipPhotoAttachment') &&
        !value.length
      ) {
        methods.setError(target, {
          message: '파일을 첨부 해주세요.',
        });
        throw `${key} is require`;
      }

      if (!value) {
        methods.setError(target, {
          message: '빈 칸을 입력해주세요.',
        });
        throw `${key} is require`;
      }
    });
  };

  const debouncedSubmit = useDebounce(
    async (data: FormState) =>
      handleRequire(data).then(async () => {
        setError(null);

        const { partnershipAttachment, partnershipPhotoAttachment, ...rest } =
          data;

        rest.address.shift();

        const formData = new FormData();

        formData.append(
          'partnershipDto',
          new Blob(
            [
              JSON.stringify({
                ...rest,
                address: rest.address.join(' '),
                category: formatter(rest.category),
              }),
            ],
            { type: 'application/json' }
          )
        );

        partnershipAttachment.forEach((file) =>
          formData.append('partnershipAttachmentDto', file)
        );
        partnershipPhotoAttachment.forEach((file) =>
          formData.append('partnershipPhotoAttachmentDto', file.file)
        );

        partnershipMutation.mutate(formData, {
          onSuccess: () => {
            onOpen(
              <Modal
                title="제휴업체 문의"
                description="제휴업체 문의가 등록 완료되었습니다."
                clickText="확인"
                background="rgba(30, 30, 32, 0.5)"
                onClick={() => handleModal('/inquiry')}
                onClose={() => handleModal('/inquiry')}
                onCancel={() => handleModal('/inquiry')}
              />
            );
          },
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
            {partnershipMutation.isLoading ? '등록 중..' : '작성 완료'}
          </Button>
        </Wrapper.Item>
        {error && <Alert severity="error" title={error} />}
      </Form>
    </FormProvider>
  );
};

export default PartnershipForm;
