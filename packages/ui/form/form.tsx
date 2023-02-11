import * as React from "react";
import type {
  DefaultTheme,
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  ThemeProps,
} from "styled-components";

import { Title } from "../components";
import * as Styled from "./form.styled";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  title?: string;
  titleAlign?: React.CSSProperties["textAlign"];
  className?: string;
  css?:
    | FlattenSimpleInterpolation
    | FlattenInterpolation<ThemeProps<DefaultTheme>>;
}

const Form = (props: FormProps, ref: React.Ref<HTMLFormElement>) => {
  const {
    title,
    titleAlign,
    className = "form",
    css,
    children,
    ...rest
  } = props;
  return (
    <>
      {title && <Title textAlign={titleAlign}>{title}</Title>}
      <Styled.Form css={css} ref={ref} className={className} {...rest}>
        {children}
      </Styled.Form>
    </>
  );
};

export default React.forwardRef(Form);
