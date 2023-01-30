import Button from 'components/common/button';
import {
  Form,
  FormAgreement,
  FormRadio,
  FormSelect,
} from 'components/common/form';
import FormChoices from 'components/common/form/formChoices';
import FormRange from 'components/common/form/formRange';
import inquiry from 'constants/inquiry';
import { FormProvider, useForm } from 'react-hook-form';

import InquiryFormItem from '../inquiryFormItem';

const SaleForm = () => {
  const methods = useForm();
  const onSubmit = methods.handleSubmit((d) => console.log(d));
  return (
    <FormProvider {...methods}>
      <Form onSubmit={onSubmit}>
        {inquiry.register.car.map((d) => (
          <InquiryFormItem
            key={d.htmlFor}
            callback={(d) => console.log(d)}
            {...d}
          />
        ))}
        <FormSelect
          option={{
            name: 'pet',
            values: ['dog', 'cat'],
          }}
        />
        <FormRange
          from={{ name: 'pet', values: ['dog', 'cat'] }}
          to={{ name: 'pet', values: ['dog', 'cat'] }}
        />
        <FormChoices
          options={[
            { name: 'pet', values: ['dog', 'cat'], suffix: '년' },
            { name: 'pet2', values: ['dog', 'cat'], suffix: '월' },
          ]}
          callback={(v) => console.log(v)}
        />
        <FormAgreement name="동의" content="판매약관 내용에 동의합니다." />
        <FormRadio
          name="test"
          options={[
            { name: '1', value: '1' },
            { name: '2', value: '2' },
          ]}
        />
        <Button type="submit" width="104px">
          작성 완료
        </Button>
      </Form>
    </FormProvider>
  );
};

export default SaleForm;
