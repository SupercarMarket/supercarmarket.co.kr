import { FormInput, FormLabel, FormPostcode } from 'components/common/form';
import FormFiles from 'components/common/form/formFiles';
import Wrapper from 'components/common/wrapper';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { css } from 'styled-components';

export interface FormState {
  dealerName: string;
  dealerPhone: string;
  dealerPostcode: string;
  dealerBusinessNumber: string;
  dealerCertification: string;
}

interface InquiryFormItemProps {
  htmlFor: keyof FormState;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  options?: RegisterOptions;
  successMessage?: string;
  errorMessage?: string;
  callback?: (data: unknown) => void;
}

type InquiryFormItemContainerProps = React.PropsWithChildren &
  InquiryFormItemProps;

const InquiryFormItem = (props: InquiryFormItemProps) => {
  const {} = useFormContext();
  return <InquiryFormItemContainer {...props} />;
};

const InquiryFormItemContainer = (props: InquiryFormItemContainerProps) => {
  const { htmlFor, label, type, children } = props;
  return (
    <FormLabel name={htmlFor} label={label} width="200px" bold>
      <Wrapper
        css={css`
          width: 100%;
        `}
      >
        {
          {
            dealerName: <FormInput />,
            dealerPhone: <FormInput />,
            dealerBusinessNumber: <FormInput />,
            dealerPostcode: <FormPostcode />,
            dealerCertification: <FormFiles />,
          }[htmlFor]
        }
      </Wrapper>
    </FormLabel>
  );
};

export default InquiryFormItem;
