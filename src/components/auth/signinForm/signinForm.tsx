import Button from 'components/common/button';
import Container from 'components/common/container';
import Divider from 'components/common/divider';
import Input from 'components/common/input';
import Wrapper from 'components/common/wrapper';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import * as style from './signinForm.styled';
import { Form } from './signinForm.styled';

const oauth = [{ provider: 'google' }, { provider: 'kakao' }];

interface FormState {
  userId: string;
  password: string;
}

const Links = () => {
  return (
    <Container display="flex" alignItems="center" justifyContent="center">
      <Link
        href="/auth"
        style={{
          cursor: 'pointer',
        }}
      >
        아이디 찾기
      </Link>
      <Divider width="1px" height="10px" color="#C3C3C7" margin="0 10px" />
      <Link
        href="/auth"
        style={{
          cursor: 'pointer',
        }}
      >
        비밀번호 찾기
      </Link>
      <Divider width="1px" height="10px" color="#C3C3C7" margin="0 10px" />
      <Link
        href="/auth/signup"
        style={{
          cursor: 'pointer',
        }}
      >
        회원가입
      </Link>
    </Container>
  );
};

const LocalFormItem = () => {
  const { register, handleSubmit } = useForm<FormState>();

  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <Form onSubmit={onSubmit}>
      <Wrapper css={style.wrapper}>
        <label>
          <Input
            id="userId"
            type="text"
            placeholder="아이디를 입력해주세요"
            {...register('userId', { required: true })}
          />
        </label>
        <label>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            {...register('password', { required: true })}
          />
        </label>
      </Wrapper>
      <Button type="submit" variant="Primary" fullWidth>
        로그인
      </Button>
      <Links />
    </Form>
  );
};

const OauthFormItem = () => {
  return (
    <div>
      <h1></h1>
    </div>
  );
};

const SigninForm = () => {
  return (
    <Container display="flex" flexDirection="column" alignItems="center">
      <LocalFormItem />
      <OauthFormItem />
    </Container>
  );
};

export default SigninForm;
