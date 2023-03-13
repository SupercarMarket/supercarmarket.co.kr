import * as React from 'react';
import { css } from 'styled-components';

import { Typography } from '../components';
import { Wrapper } from '../components/wrapper';
import { applyMediaQuery } from '../styles';

interface FormLabelProps extends React.PropsWithChildren {
  name?: string;
  label?: string;
  className?: string;
  bold?: boolean;
  hidden?: boolean;
  width?: React.CSSProperties['width'];
  paddingTop?: React.CSSProperties['paddingTop'];
  flexDirection?: React.CSSProperties['flexDirection'];
  gap?: React.CSSProperties['gap'];
}

const FormLabel = (props: FormLabelProps) => {
  const {
    name,
    label,
    bold = false,
    hidden = false,
    width = '140px',
    paddingTop = '18px',
    flexDirection = 'row',
    gap,
    className,
    children,
  } = props;
  return (
    <Wrapper
      className={className}
      css={css`
        display: flex;
        flex-direction: ${flexDirection};
        gap: ${gap};

        ${applyMediaQuery('mobile')} {
          width: 100%;
          flex-direction: column;
          gap: 4px;
        }
      `}
    >
      <Wrapper.Item
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <Typography
          as="label"
          htmlFor={name}
          fontSize="body-16"
          fontWeight={bold ? 'bold' : 'regular'}
          lineHeight="150%"
          style={{
            display: hidden ? 'none' : 'block',
            width,
          }}
        >
          {label}
        </Typography>
      </Wrapper.Item>
      {children}
    </Wrapper>
  );
};

export { FormLabel };
export type { FormLabelProps };
