import Button from 'components/common/button';
import { Form } from 'components/common/form';
import inquiry from 'constants/inquiry';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from 'styled-components';

import InquiryFormItem from '../inquiryFormItem';

const PartnershipForm = () => {
  const methods = useForm();
  const onSubmit = methods.handleSubmit((d) => console.log(d));
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
      </Form>
    </FormProvider>
  );
};

export default PartnershipForm;
