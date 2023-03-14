'use client';
import Link from 'next/link';
import * as React from 'react';
import { css } from 'styled-components';
import { Wrapper } from '../components/wrapper';
import { Button } from '../components/button';
import { Container } from '../components/container';
import { Typography } from '../components/typography';
import { theme } from '../styles';

interface FormAgreementProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  content?: string;
  href?: string;
  handleCick?: () => void;
}

const FormAgreement = (props: FormAgreementProps) => {
  const { name, content, href = '/', handleCick, ...rest } = props;
  return (
    <Container
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Wrapper
        css={css`
          display: flex;
          align-items: center;
          gap: 8px;
          input[type='checkbox'] {
            -webkit-appearance: none;
            appearance: none;
            display: none;
          }
          input[type='checkbox'] + label {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 1px solid ${theme.color.primary};
            border-radius: 50%;
            position: relative;
            cursor: pointer;
          }
          input[type='checkbox'] + label > div {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-sizing: border-box;
            border: 2px solid ${theme.color.white};
          }
          input[type='checkbox']:checked + label > div {
            background: ${theme.color.primary};
          }
        `}
      >
        <input {...rest} id={name} name={name} type="checkbox" />
        <label htmlFor={name}>
          <div />
        </label>
        <Typography>{content}</Typography>
      </Wrapper>
      {handleCick && (
        <Button type="button" variant="Line" width="120px" onClick={handleCick}>
          보기
        </Button>
      )}
    </Container>
  );
};

export { FormAgreement };
export type { FormAgreementProps };
