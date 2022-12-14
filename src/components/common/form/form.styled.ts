import type {
  DefaultTheme,
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  ThemeProps,
} from 'styled-components';
import styled from 'styled-components';

const Form = styled.form<{
  css:
    | FlattenSimpleInterpolation
    | FlattenInterpolation<ThemeProps<DefaultTheme>>
    | undefined;
}>`
  ${({ css }) => css}
`;

export { Form };
