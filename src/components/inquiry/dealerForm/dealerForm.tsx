import Button from 'components/common/button';
import { Form } from 'components/common/form';
import inquiry from 'constants/inquiry';
import { FormProvider, useForm } from 'react-hook-form';

import InquiryFormItem from '../inquiryFormItem';
import * as style from './dealer.styled';

const DealerForm = () => {
  const methods = useForm();
  const onSubmit = methods.handleSubmit((d) => console.log(d));
  return (
    <FormProvider {...methods}>
      <Form css={style.form} onSubmit={onSubmit}>
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
