import type { PropsWithChildren } from 'react';
import type {
  DefaultTheme,
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  ThemeProps,
} from 'styled-components';

import { Container } from './wrapper.styled';

interface WrapperProps {
  css?:
    | FlattenSimpleInterpolation
    | FlattenInterpolation<ThemeProps<DefaultTheme>>;
  className?: string;
}

const Wrapper = (props: PropsWithChildren<WrapperProps>) => {
  const { css, children, className = 'wrapper' } = props;
  return (
    <Container css={css} className={className}>
      {children}
    </Container>
  );
};

Wrapper.Top = function Top(props: PropsWithChildren<WrapperProps>) {
  const { css, children, className = 'top' } = props;
  return (
    <Container css={css} className={className}>
      {children}
    </Container>
  );
};

Wrapper.Bottom = function Bottom(props: PropsWithChildren<WrapperProps>) {
  const { css, children, className = 'bottom' } = props;
  return (
    <Container css={css} className={className}>
      {children}
    </Container>
  );
};

Wrapper.Left = function Left(props: PropsWithChildren<WrapperProps>) {
  const { css, children, className = 'left' } = props;
  return (
    <Container css={css} className={className}>
      {children}
    </Container>
  );
};

Wrapper.Right = function Right(props: PropsWithChildren<WrapperProps>) {
  const { css, children, className = 'right' } = props;
  return (
    <Container css={css} className={className}>
      {children}
    </Container>
  );
};

export default Wrapper;
