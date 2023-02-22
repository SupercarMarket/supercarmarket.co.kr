import clsx from 'clsx';
import { ButtonHTMLAttributes, Ref, useId } from 'react';
import { forwardRef } from 'react';
import { deviceQuery } from '../../styles';

type Variant = 'Primary' | 'Primary-Line' | 'Line' | 'Black' | 'Init';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  className?: string;
  prefixx?: string | JSX.Element;
  suffix?: JSX.Element;
  variant?: Variant;
  border?: 'normal' | 'rounded';
  type?: 'submit' | 'reset' | 'button';
  width?: string | number;
  disabled?: boolean;
  active?: boolean;
}

const Button = forwardRef(function Button(
  props: ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  const {
    type,
    children,
    fullWidth,
    variant = 'Primary',
    border = 'normal',
    className,
    disabled = false,
    style = {},
    active,
    prefixx,
    suffix,
    width,
    ...rest
  } = props;
  const buttonId = useId();
  return (
    <>
      <button
        ref={ref}
        type={type}
        id={buttonId}
        aria-pressed={active}
        className={clsx(
          'button',
          {
            [`button-${border}`]: border,
            [`button-${variant}`]: variant,
            'button-disabled': disabled,
            'button-active': active,
          },
          className
        )}
        disabled={disabled}
        style={{
          width,
          whiteSpace: 'nowrap',
          ...style,
        }}
        {...rest}
      >
        {prefixx && (
          <i
            className={clsx({
              'button-suffix': prefixx,
            })}
          >
            {prefixx}
          </i>
        )}
        {children}
        {suffix && (
          <i
            className={clsx({
              'button-suffix': suffix,
            })}
          >
            {suffix}
          </i>
        )}
      </button>
      <style jsx>{`
        .button {
          all: unset;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${fullWidth ? '100%' : 'auto'};
          font-size: 16px;
          font-weight: 400;
          line-height: 150%;
          padding: 10px 22px;
          gap: 4px;
          background-color: gray;
          cursor: pointer;
        }
        .button-normal {
          border-radius: 4px;
        }
        .button-rounded {
          border-radius: 20px;
        }
        .button-Primary {
          color: #ffffff;
          border: 1px solid #b79f7b;
          background-color: #b79f7b;
        }
        .button-Primary:hover {
          background-color: #725b30;
        }
        .button-Primary-Line {
          box-sizing: border-box;
          color: #b79f7b;
          background-color: #fff;
          border: 1px solid #b79f7b;
        }
        .button-Primary-Line:hover {
          background-color: #eaeaec;
        }
        .button-Line {
          box-sizing: border-box;
          color: #1e1e20;
          background-color: #fff;
          border: 1px solid #c3c3c7;
        }
        .button-Line:hover {
          background-color: #eaeaec;
        }
        .button-Black {
          color: #ffffff;
          background-color: #1e1e20;
          border: 1px solid #1e1e20;
        }
        .button-Black:hover {
          background-color: #000;
        }
        .button-Init {
          all: unset;
        }
        .button-suffix {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .button-disabled {
          cursor: not-allowed;
        }
        @media (${deviceQuery.mobile}) {
          .button {
            padding: 9.5px 16px;
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
});

export { Button };
