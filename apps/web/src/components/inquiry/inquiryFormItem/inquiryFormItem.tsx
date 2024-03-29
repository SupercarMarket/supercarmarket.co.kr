import {
  Divider,
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
  FormFiles,
  FormImages,
  FormTextArea,
  Wrapper,
  applyMediaQuery,
} from '@supercarmarket/ui';
import { Form, FormType } from 'constants/form';
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
  Form<string, Exclude<FormType, 'tel' | 'email' | 'password'>> & {
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
        ${applyMediaQuery('mobile')} {
          flex-direction: column;
          gap: 8px;
        }
      `}
    >
      <FormInput
        name={htmlFor}
        id={htmlFor}
        ref={inputRef}
        value={value}
        suffix={suffix}
        onChange={(e) => setValue(e.target.value)}
      />
      <Wrapper.Item
        css={css`
          position: absolute;
          display: flex;
          align-items: center;
          right: -113px;
          top: 50%;
          transform: translateY(-50%);
          ${applyMediaQuery('mobile')} {
            all: unset;
          }
        `}
      >
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

const InquiryFormItem = (
  props: Form<string, Exclude<FormType, 'tel' | 'email' | 'password'>>
) => {
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
              tel: (
                <FormInput
                  type="tel"
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
                  description={`파일은 ${
                    options.size ? options.size : 20
                  }개까지만 첨부 가능합니다.`}
                  size={options.size}
                  callback={(value) => setValue(htmlFor, value)}
                />
              ),
              image: (
                <FormImages
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
                  description={`사진은 ${
                    options.size ? options.size : 20
                  }장까지만 첨부 가능합니다.`}
                  id={htmlFor}
                  name={htmlFor}
                  size={options.size}
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
