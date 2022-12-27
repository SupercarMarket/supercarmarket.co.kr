import {
  css,
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

const wrapper = css`
  width: 100%;
  position: relative;
`;

const item = css`
  position: absolute;
  right: 14px;
  top: 8px;
`;

export { Form, item, wrapper };
