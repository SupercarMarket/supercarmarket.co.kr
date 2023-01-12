import Button from 'components/common/button';
import { Form } from 'components/common/form';
import { FormProvider, useForm } from 'react-hook-form';

import InquiryFormItem from '../inquiryFormItem';
import { FormState } from '../inquiryFormItem/inquiryFormItem';
import * as style from './dealer.styled';

const dealer: {
  htmlFor: keyof FormState;
  label: string;
  type: string;
}[] = [
  {
    htmlFor: 'dealerName',
    label: '상사명',
    type: 'text',
  },
  {
    htmlFor: 'dealerPhone',
    label: '상사 전화번호',
    type: 'text',
  },
  {
    htmlFor: 'dealerPostcode',
    label: '상사 주소',
    type: 'search',
  },
  {
    htmlFor: 'dealerBusinessNumber',
    label: '상사 사업자 등록번호',
    type: 'text',
  },
  {
    htmlFor: 'dealerCertification',
    label: '사업자 등록증 사본',
    type: 'file',
  },
];

const DealerForm = () => {
  const methods = useForm();
  const onSubmit = methods.handleSubmit((d) => console.log(d));
  return (
    <FormProvider {...methods}>
      <Form css={style.form} onSubmit={onSubmit}>
        {dealer.map((d) => (
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
