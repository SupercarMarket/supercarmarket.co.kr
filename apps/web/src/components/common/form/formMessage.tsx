import * as React from 'react';

import Container from '../container';
import Typography from '../typography';

interface FormMessageProps {
  tooltip?: string;
  success?: string;
  error?: string;
  padding?: React.CSSProperties['padding'];
  gap?: React.CSSProperties['gap'];
}

const FormMessage = React.memo(function FormMessage({
  tooltip,
  success,
  error,
  padding,
  gap = '6px',
}: FormMessageProps) {
  return (
    <Container
      display="flex"
      flexDirection="column"
      padding={padding}
      gap={gap}
    >
      {tooltip && (
        <Typography
          as="span"
          fontSize="body-12"
          fontWeight="regular"
          color="greyScale-5"
          lineHeight="150%"
        >
          {tooltip}
        </Typography>
      )}
      {success && (
        <Typography
          as="span"
          fontSize="body-12"
          fontWeight="regular"
          color="primary"
          lineHeight="150%"
        >
          {success}
        </Typography>
      )}
      {error && (
        <Typography
          as="span"
          fontSize="body-12"
          fontWeight="regular"
          color="system-1"
          lineHeight="150%"
        >
          {error}
        </Typography>
      )}
    </Container>
  );
});

export default FormMessage;
