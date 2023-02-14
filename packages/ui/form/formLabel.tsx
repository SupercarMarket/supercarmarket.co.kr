import * as React from 'react';

import { Container, Typography } from '../components';
import { Wrapper } from '../components/wrapper';

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
    <Container
      display="flex"
      flexDirection={flexDirection}
      gap={gap}
      className={className}
    >
      <Wrapper>
        <Typography
          as="label"
          htmlFor={name}
          fontSize="body-16"
          fontWeight={bold ? 'bold' : 'regular'}
          style={{
            display: hidden ? 'none' : 'block',
            width,
            paddingTop,
          }}
        >
          {label}
        </Typography>
      </Wrapper>
      {children}
    </Container>
  );
};

export { FormLabel };
export type { FormLabelProps };
