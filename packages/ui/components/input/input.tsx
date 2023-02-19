import { CSSProperties, InputHTMLAttributes, Ref } from 'react';
import { forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: CSSProperties['width'];
  className?: string;
}

const Input = forwardRef(function Input(
  props: InputProps,
  ref: Ref<HTMLInputElement>
) {
  const {
    type,
    name,
    width = '100%',
    onInvalid,
    className = 'input',
    ...rest
  } = props;

  return (
    <>
      <input
        ref={ref}
        name={name}
        type={type}
        className={className}
        onInvalid={onInvalid}
        style={{ width }}
        {...rest}
      />
      <style jsx>{`
        .input {
          all: none;
          border: none;
          outline: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          box-sizing: border-box;
          padding: 10px 14px;
          font-weight: 500;
          font-size: 14px;
          line-height: 150%;
          border: 1px solid #eaeaec;
          border-radius: 4px;
        }
        .input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px white inset;
          box-shadow: 0 0 0 1000px white inset;
        }
        .input::placeholder {
          color: #8e8e95;
        }
        .input:focus {
          border: 1px solid #8e8e95;
        }
        .input:invalid {
          border: 1px solid #ed7474;
        }
      `}</style>
    </>
  );
});

export { Input };
export type { InputProps };
