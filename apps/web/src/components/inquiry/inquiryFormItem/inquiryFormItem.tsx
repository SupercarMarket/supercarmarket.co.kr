import Divider from 'components/common/divider';
import {
  FormAgreement,
  FormAttachment,
  FormInput,
  FormLabel,
  FormMessage,
  FormPostcode,
  FormRadio,
  FormRadioGroup,
  FormRange,
  FormSelect,
} from 'components/common/form';
import FormFiles from 'components/common/form/formFiles';
import FormImage from 'components/common/form/formImages';
import FormTextArea from 'components/common/form/formTextArea';
import Wrapper from 'components/common/wrapper';
import type { InquiryRegister } from 'constants/inquiry';
import * as React from 'react';
import type {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
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
    patternError?:
      | FieldError
      | Merge<FieldError, FieldErrorsImpl<any>>
      | Partial<{ type: string | number; message: string }>;
  };

const InquiryFormMixed = (
  props: InquiryFormItemContainerProps & { callback?: (value: string) => void }
) => {
  const { htmlFor, suffix, callback, ...rest } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const radioRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState('');
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    if (value !== '상담') setChecked(false);
    else setChecked(true);
  }, [value]);

  React.useEffect(() => {
    if (callback) callback(value);
  }, [value]);

  return (
    <Wrapper
      css={css`
        position: relative;
        display: flex;
      `}
    >
      <FormInput
        name={htmlFor}
        id={htmlFor}
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Wrapper.Item
        css={css`
          position: absolute;
          display: flex;
          align-items: center;
          gap: 16px;
          right: -113px;
          top: 50%;
          transform: translateY(-50%);
        `}
      >
        {suffix}
        <FormRadio
          ref={radioRef}
          checked={checked}
          content="상담"
          onClick={() => {
            if (checked) setValue('');
            else setValue('상담');
            setChecked((prev) => !prev);
          }}
        />
      </Wrapper.Item>
    </Wrapper>
  );
};

const InquiryFormItem = (props: InquiryRegister) => {
  const { htmlFor, options } = props;
  const {
    register,
    setValue,
    formState: { isSubmitted, errors },
  } = useFormContext();
  const target = useWatch({ name: htmlFor });
  const patternError = errors[props.htmlFor];

  const isRequire = isSubmitted && options.required === true && !target;

  return (
    <InquiryFormItemContainer
      register={register}
      setValue={setValue}
      isRequire={isRequire}
      patternError={patternError}
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
    tooltip,
    options,
    patternError,
    register,
    setValue,
    isRequire,
  } = props;

  const fieldErrorMessage = React.useMemo(() => {
    if (patternError) return patternError.message as string;
    else return undefined;
  }, [patternError]);

  return (
    <>
      <FormLabel
        name={htmlFor}
        label={label}
        width="200px"
        bold
        flexDirection={type === 'textarea' ? 'column' : undefined}
        gap={type === 'textarea' ? '22.5px' : undefined}
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
                  title="사진1"
                  id={htmlFor}
                  name={htmlFor}
                  size={1}
                  callback={(value) => setValue(htmlFor, value)}
                />
              ),
              images: (
                <FormAttachment
                  title="사진 추가"
                  description="사진은 20장까지만 첨부 가능합니다."
                  id={htmlFor}
                  name={htmlFor}
                  accept="image/jpg, image/png, image/jpeg"
                  callback={(value) => setValue(htmlFor, value)}
                />
              ),
              textarea: (
                <FormTextArea
                  placeholder={placeholder}
                  {...register(htmlFor)}
                />
              ),
              radioGroup: (
                <FormRadioGroup
                  name={htmlFor}
                  options={options.option?.values}
                  callback={(value) => setValue(htmlFor, value)}
                >
                  {({ name, options, handleChange }) =>
                    options ? (
                      <Wrapper
                        css={css`
                          display: flex;
                          align-items: center;
                          gap: 16px;
                        `}
                      >
                        {options.map((value) => (
                          <FormRadio
                            name={name}
                            key={value}
                            id={value}
                            value={value}
                            onChange={handleChange}
                            content={value}
                          />
                        ))}
                      </Wrapper>
                    ) : (
                      <></>
                    )
                  }
                </FormRadioGroup>
              ),
              agreement: (
                <FormAgreement
                  content={tooltip}
                  name={htmlFor}
                  onChange={(e) => setValue(htmlFor, e.target.checked)}
                />
              ),
              select: (
                <FormSelect
                  option={{
                    name: options.option?.name || '',
                    values: options.option?.values || [],
                  }}
                  name={htmlFor}
                  callback={(value) => setValue(htmlFor, value)}
                />
              ),
              range: (
                <FormRange
                  from={{
                    name: '',
                    values: [],
                  }}
                  to={{ name: '', values: [] }}
                />
              ),
              mixed: (
                <InquiryFormMixed
                  {...props}
                  callback={(value) => setValue(htmlFor, value)}
                />
              ),
            }[type]
          }
          <FormMessage error={fieldErrorMessage} padding="0 14px" />
        </Wrapper>
      </FormLabel>
      {divider && (
        <Divider width="100%" height="1px" color="#EAEAEC" margin="16px 0" />
      )}
    </>
  );
};

export default InquiryFormItem;
