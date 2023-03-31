'use client';

import type { AriaRole, PropsWithChildren } from 'react';
import type {
  DefaultTheme,
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  ThemeProps,
} from 'styled-components';
import styled, { css as style } from 'styled-components';

interface WrapperProps {
  css?:
    | FlattenSimpleInterpolation
    | FlattenInterpolation<ThemeProps<DefaultTheme>>;
  className?: string;
  role?: AriaRole;
}

const Wrapper = (props: PropsWithChildren<WrapperProps>) => {
  const { css = style``, children, className = 'wrapper', role } = props;
  return (
    <Container role={role} css={css} className={className}>
      {children}
    </Container>
  );
};

Wrapper.Item = function Top(props: PropsWithChildren<WrapperProps>) {
  const { css, children, className = 'item' } = props;
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

const Container = styled.div<{
  css:
    | FlattenSimpleInterpolation
    | FlattenInterpolation<ThemeProps<DefaultTheme>>
    | undefined;
}>`
  ${({ css }) => css}
`;

export { Wrapper };
export type { WrapperProps };
