import { Alert, Button, Container, Typography } from '@supercarmarket/ui';
import * as React from 'react';
import type { FallbackProps } from 'react-error-boundary';

type ErrorFallbackProps = FallbackProps & {
  description?: string;
  margin?: React.CSSProperties['margin'];
};

const ErrorFallback = ({
  error,
  description,
  margin,
  resetErrorBoundary,
}: ErrorFallbackProps) => {
  return (
    <Container
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="20px"
      margin={margin}
    >
      <Alert title={error.message} severity="error" />
      <Typography
        fontSize="body-14"
        fontWeight="regular"
        color="greyScale-5"
        lineHeight="150%"
      >
        {description
          ? description
          : '지속적으로 에러가 발생한다면 문의 게시판에 문의를 남겨주세요.'}
      </Typography>
      <Button type="button" variant="Line" onClick={resetErrorBoundary}>
        재시도
      </Button>
    </Container>
  );
};

export default ErrorFallback;
