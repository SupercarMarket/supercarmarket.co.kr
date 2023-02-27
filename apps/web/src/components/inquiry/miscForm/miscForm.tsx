import { clientApi, ErrorCode } from '@supercarmarket/lib';
import { Alert, Button, Form } from '@supercarmarket/ui';
import { Modal } from 'components/common/modal';
import inquiry, { InquiryMiscFormState } from 'constants/inquiry';
import ModalContext from 'feature/modalContext';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from 'styled-components';
import { useRouter, usePathname } from 'next/navigation';

import InquiryFormItem from '../inquiryFormItem';

const MiscForm = () => {
  const session = useSession();
  const { onClose, onOpen } = React.useContext(ModalContext);
  const { replace } = useRouter();
  const pathname = usePathname();
  const methods = useForm<InquiryMiscFormState>();
  const [error, setError] = React.useState<string | null>(null);

  const handleModal = React.useCallback(
    (href: string) => {
      onClose(() => {
        replace(href);
      });
    },
    [onClose, replace]
  );

  const handleRequire = async (data: InquiryMiscFormState) => {
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

  const onSubmit = methods.handleSubmit((data) =>
    handleRequire(data).then(async () => {
      setError(null);

      const { title, contents } = data;

      const result = await clientApi('/server/supercar/v1/inquiry-etc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ACCESS_TOKEN: session.data?.accessToken || '',
        },
        data: { title, contents },
      });

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
        onSubmit={onSubmit}
        css={css`
          display: flex;
          flex-direction: column;
          gap: 24px;
        `}
      >
        {inquiry.register.misc.map((d) => (
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

export default MiscForm;
