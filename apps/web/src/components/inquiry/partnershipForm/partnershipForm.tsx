import { clientApi, ErrorCode, fetcher } from '@supercarmarket/lib';
import { Alert, Button, Form } from '@supercarmarket/ui';
import { Modal } from 'components/common/modal';
import inquiry, { InquiryPartnershipFormState } from 'constants/inquiry';
import ModalContext from 'feature/modalContext';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from 'styled-components';
import { useRouter } from 'next/navigation';

import InquiryFormItem from '../inquiryFormItem';

const formatter = (category: string) => {
  if (category === '전체') return 'all';
  if (category === '자동차매장') return 'automobile-store';
  if (category === '공업사') return 'industries';
  if (category === '도색') return 'painting';
  if (category === '디테일링') return 'detailing';
  return 'misc';
};

const PartnershipForm = () => {
  const session = useSession();
  const [error, setError] = React.useState<string | null>(null);
  const { onClose, onOpen } = React.useContext(ModalContext);
  const { replace } = useRouter();
  const methods = useForm<InquiryPartnershipFormState>();

  const handleModal = React.useCallback(
    (href: string) => {
      onClose(() => {
        replace(href);
      });
    },
    [onClose, replace]
  );

  const handleRequire = async (data: InquiryPartnershipFormState) => {
    Object.entries(data).map(([key, value]) => {
      if (!value) {
        methods.setError(key as keyof InquiryPartnershipFormState, {
          message: '빈 칸을 입력해주세요.',
        });
        throw `${key} is require`;
      }
      if (!value.length) {
        methods.setError(key as keyof InquiryPartnershipFormState, {
          message: '파일을 첨부 해주세요.',
        });
        throw `${key} is require`;
      }
    });
  };

  const onSubmit = methods.handleSubmit((data) =>
    handleRequire(data).then(async () => {
      setError(null);

      const { partnershipAttachment, partnershipPhotoAttachment, ...rest } =
        data;

      const formData = new FormData();

      formData.append(
        'partnershipDto',
        new Blob(
          [JSON.stringify({ ...rest, category: formatter(rest.category) })],
          { type: 'application/json' }
        )
      );

      partnershipAttachment.forEach((file) =>
        formData.append('partnershipAttachment', file)
      );
      partnershipPhotoAttachment.forEach((file) =>
        formData.append('partnershipPhotoAttachment', file)
      );

      const response = await fetcher('/server', {
        method: 'POST',
        headers: {
          ACCESS_TOKEN: session.data?.accessToken || '',
        },
        data: formData,
      });

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
        {inquiry.register.partnership.map((d) => (
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
