import Button from 'components/common/button';
import { Form } from 'components/common/form';
import inquiry, { InquiryDealerFormState } from 'constants/inquiry';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from 'styled-components';

import InquiryFormItem from '../inquiryFormItem';

const DealerForm = () => {
  const methods = useForm<InquiryDealerFormState>();
  const onSubmit = methods.handleSubmit((d) => {
    const { comAddress } = d;
  });
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
      </Form>
    </FormProvider>
  );
};

export default DealerForm;
