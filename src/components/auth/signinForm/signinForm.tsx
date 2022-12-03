import Button from 'components/common/button';
import Container from 'components/common/container';
import Input from 'components/common/input';
import Wrapper from 'components/common/wrapper';

const SigninForm = () => {
  return (
    <Container
      element="form"
      width="340px"
      display="flex"
      flexDirection="column"
    >
      <Wrapper>
        <Input type="text" placeholder="아이디를 입력해주세요." />
        <Input type="password" placeholder="비밀번호를 입력해주세요." />
      </Wrapper>
      <Button type="submit">로그인</Button>
      <Wrapper></Wrapper>
    </Container>
  );
};

export default SigninForm;
