import Button from 'components/common/button';
import Container from 'components/common/container';
import Input from 'components/common/input';
import Typography from 'components/common/typography';
import Wrapper from 'components/common/wrapper';
import type { HTMLInputTypeAttribute, PropsWithChildren } from 'react';

import * as style from './signupForm.styled';

interface LabelProps extends PropsWithChildren {
  htmlFor?: string;
  label?: string;
}

interface FormItemProps extends PropsWithChildren {
  htmlFor?: string;
  id?: string;
  name?: string;
  type?: HTMLInputTypeAttribute;
}

const Label = ({ label, htmlFor, children }: LabelProps) => {
  return (
    <Wrapper css={style.label}>
      <Typography
        as="label"
        htmlFor={htmlFor}
        fontSize="body-16"
        fontWeight="regular"
        color="greyScale-6"
        lineHeight="150%"
      >
        {label}
      </Typography>
      {children}
    </Wrapper>
  );
};

const FormItem = ({ type }: FormItemProps) => {
  return (
    <Wrapper css={style.wrapper}>
      <Input type={type} id="userId" name="userId" />
      <Button variant="Primary-Line" width="140px">
        중복 확인
      </Button>
    </Wrapper>
  );
};

const SignupForm = () => {
  return (
    <Container as="form" width="800px" display="flex" flexDirection="column">
      <Label htmlFor="userId" label="아이디">
        <Wrapper css={style.wrapper}>
          <Input type="text" id="userId" name="userId" />
          <Button variant="Primary-Line" width="140px">
            중복 확인
          </Button>
        </Wrapper>
      </Label>
      <Label htmlFor="password" label="비밀번호">
        <Wrapper css={style.wrapper}>
          <Input type="password" id="password" name="password" />
        </Wrapper>
      </Label>
      <Label htmlFor="passwordConfirm" label="비밀번호 확인">
        <Wrapper css={style.wrapper}>
          <Input type="password" id="passwordConfirm" name="passwordConfirm" />
        </Wrapper>
      </Label>
      <Label htmlFor="name" label="이름">
        <Wrapper css={style.wrapper}>
          <Input type="text" id="name" name="name" />
        </Wrapper>
      </Label>
      <Label htmlFor="nickName" label="닉네임">
        <Wrapper css={style.wrapper}>
          <Input type="text" id="nickName" name="nickName" />
          <Button variant="Primary-Line" width="140px">
            중복 확인
          </Button>
        </Wrapper>
      </Label>
      <Label htmlFor="call" label="휴대폰">
        <Wrapper css={style.wrapper}>
          <Input type="text" id="call" name="call" />
          <Button variant="Primary-Line" width="120px">
            인증번호 받기
          </Button>
        </Wrapper>
      </Label>
      <Label htmlFor="authentication" label="인증번호">
        <Wrapper css={style.wrapper}>
          <Input
            type="authentication"
            id="authentication"
            name="authentication"
          />
          <Button variant="Primary-Line" width="120px">
            인증번호 확인
          </Button>
        </Wrapper>
      </Label>
      <Label htmlFor="email" label="이메일">
        <Wrapper css={style.wrapper}>
          <Input type="email" id="email" name="email" />
          <Button variant="Primary-Line" width="140px">
            중복 확인
          </Button>
        </Wrapper>
      </Label>
    </Container>
  );
};

export default SignupForm;
