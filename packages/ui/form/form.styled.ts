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

const Input = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  cursor: pointer;
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

const suffix = css`
  position: absolute;
  right: -37px;
  top: 50%;
  transform: translateY(-50%);
`;

const imageWrapper = css`
  display: flex;
  align-items: center;
`;

const imageTitle = css`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const imageButton = css`
  display: flex;
  align-items: center;
  width: 24px;
  cursor: pointer;
`;

const filesWrapper = css`
  height: 44px;
  display: flex;
  flex: 1;
  align-items: center;
  gap: 16px;
  padding: 0 16px;
  border: 1px solid #c3c3c7;
  border-radius: 4px;
`;

const filesButton = css`
  display: flex;
  align-items: center;
  width: 16px;
  cursor: pointer;
`;

const postcodeWrapper = css`
  display: flex;
  gap: 8px;
`;

export {
  filesButton,
  filesWrapper,
  Form,
  imageButton,
  imageTitle,
  imageWrapper,
  Input,
  item,
  Label,
  postcodeWrapper,
  suffix,
  wrapper,
};
