import * as React from 'react';

import Container from '../container';
import Typography from '../typography';
import Wrapper from '../wrapper';

interface FormLabelProps extends React.PropsWithChildren {
  name?: string;
  label?: string;
  className?: string;
  bold?: boolean;
  hidden?: boolean;
  paddingTop?: React.CSSProperties['paddingTop'];
}

const FormLabel = (props: FormLabelProps) => {
  const {
    name,
    label,
    bold = false,
    hidden = false,
    paddingTop = '18px',
    className,
    children,
  } = props;
  return (
    <Container
      display="flex"
      justifyContent="space-between"
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

export default FormLabel;
