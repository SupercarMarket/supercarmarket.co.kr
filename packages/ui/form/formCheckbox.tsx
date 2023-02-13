import { theme } from '../styles';
import * as React from 'react';

const FormCheckbox = React.forwardRef(function FormCheckbox(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.Ref<HTMLInputElement>
) {
  const { id, name, ...rest } = props;
  return (
    <>
      <input {...rest} ref={ref} id={id} name={name} type="checkbox" />
      <label htmlFor={name} />
      <style jsx>{`
        input[type='checkbox'] {
          -webkit-appearance: none;
          appearance: none;
          display: none;
        }
        input[type='checkbox'] + label {
          display: inline-block;
          width: 18px;
          height: 18px;
          border: 2px solid ${theme.color['greyScale-5']};
          border-radius: 4px;
          position: relative;
          cursor: pointer;
        }
        input[type='checkbox']:checked + label::after {
          content: '✔';
          font-size: ${theme.fontSize['body-12']};
          width: 18px;
          height: 18px;
          text-align: center;
          position: absolute;
          line-height: 150%;
          left: 0;
          top: 0;
          background: ${theme.color.primary};
          color: ${theme.color.white};
        }
        input[type='checkbox']:checked + label {
          border: 2px solid ${theme.color.primary};
        }
      `}</style>
    </>
  );
});

export { FormCheckbox };
