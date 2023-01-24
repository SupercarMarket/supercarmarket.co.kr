import Divider from 'components/common/divider';
import {
  FormInput,
  FormLabel,
  FormMessage,
  FormPostcode,
} from 'components/common/form';
import FormFiles from 'components/common/form/formFiles';
import FormImage from 'components/common/form/formImages';
import FormTextArea from 'components/common/form/formTextArea';
import Wrapper from 'components/common/wrapper';
import type { InquiryRegister } from 'constants/inquiry';
import type {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { useFormContext, useWatch } from 'react-hook-form';
import { css } from 'styled-components';

type InquiryFormItemContainerProps = React.PropsWithChildren &
  InquiryRegister & {
    register: UseFormRegister<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    isRequire: boolean;
  };

const InquiryFormItem = (props: InquiryRegister) => {
  const { htmlFor, options } = props;
  const {
    register,
    setValue,
    formState: { isSubmitted },
  } = useFormContext();
  const target = useWatch({ name: htmlFor });

  const isRequire = isSubmitted && options.required === true && !target;

  return (
    <InquiryFormItemContainer
      register={register}
      setValue={setValue}
      isRequire={isRequire}
      {...props}
    />
  );
};

const InquiryFormItemContainer = (props: InquiryFormItemContainerProps) => {
  const {
    htmlFor,
    label,
    type,
    placeholder,
    suffix,
    divider,
    register,
    setValue,
    isRequire,
  } = props;

  return (
    <>
      <FormLabel
        name={htmlFor}
        label={label}
        width="200px"
        bold
        flexDirection={htmlFor === 'addional' ? 'column' : undefined}
        gap={htmlFor === 'addional' ? '22.5px' : undefined}
      >
        <Wrapper
          css={css`
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 6px;
          `}
        >
          {
            {
              text: (
                <FormInput
                  placeholder={placeholder}
                  suffix={suffix}
                  {...register(htmlFor)}
                />
              ),
              address: (
                <FormPostcode callback={(value) => setValue(htmlFor, value)} />
              ),
              file: (
                <FormFiles
                  id={htmlFor}
                  name={htmlFor}
                  size={1}
                  callback={(value) => setValue(htmlFor, value)}
                />
              ),
              files: (
                <FormFiles
                  id={htmlFor}
                  name={htmlFor}
                  callback={(value) => setValue(htmlFor, value)}
                />
              ),
              image: (
                <FormImage
                  title="사진 1"
                  id={htmlFor}
                  name={htmlFor}
                  callback={(value) => setValue(htmlFor, value)}
                />
              ),
              textarea: (
                <FormTextArea
                  placeholder={placeholder}
                  {...register(htmlFor)}
                />
              ),
            }[type]
          }
          <FormMessage
            error={isRequire ? `${label} 을/를 입력해주세요.` : undefined}
            padding="0 14px"
          />
        </Wrapper>
      </FormLabel>
      {divider && (
        <Divider width="100%" height="1px" color="#EAEAEC" margin="16px 0" />
      )}
    </>
  );
};

export default InquiryFormItem;
