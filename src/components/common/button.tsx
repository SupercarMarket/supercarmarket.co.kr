import { ButtonHTMLAttributes, Ref, useId } from 'react';
import { forwardRef } from 'react';
import { css } from 'styled-components';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  type?: 'submit' | 'reset' | 'button';
  width?: string | number;
  disabled?: boolean;
  active?: boolean;
}

const Button = (props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  const { type, children, fullWidth } = props;
  const buttonId = useId();
  return (
    <button
      ref={ref}
      type={type}
      id={buttonId}
      style={css`
        width: ${fullWidth ? '100%' : 'auto'};
      `}
    >
      <span>{children}</span>
    </button>
  );
};

export default forwardRef(Button);
