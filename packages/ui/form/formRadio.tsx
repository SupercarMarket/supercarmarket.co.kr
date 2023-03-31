import * as React from 'react';
import { css } from 'styled-components';

import { Wrapper } from '../components/wrapper';
import { theme } from '../styles';

interface FormRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  content?: string;
}
const FormRadio = React.forwardRef(function FormRadio(
  props: FormRadioProps,
  ref: React.Ref<HTMLInputElement>
) {
  const { name, value = 'radio', content, ...rest } = props;

  return (
    <Wrapper
      css={css`
        display: flex;
        align-items: center;
        gap: 11px;
        input[type='radio'] {
          -webkit-appearance: none;
          appearance: none;
          display: none;
        }
        input[type='radio'] + label {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 1px solid ${theme.color.primary};
          border-radius: 50%;
          position: relative;
          cursor: pointer;
        }
        input[type='radio'] + label > div {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          box-sizing: border-box;
          border: 2px solid ${theme.color.white};
        }
        input[type='radio']:checked + label > div {
          background: ${theme.color.primary};
        }
        span {
          font-weight: 500;
          font-size: 16px;
          line-height: 150%;
        }
      `}
    >
      <input
        {...rest}
        ref={ref}
        type="radio"
        id={value as string}
        value={value}
        name={name}
        readOnly
      />
      <label htmlFor={value as string}>
        <div />
      </label>
      {content && <span>{content}</span>}
    </Wrapper>
  );
});

export { FormRadio };
export type { FormRadioProps };
