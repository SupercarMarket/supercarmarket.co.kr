import { Button, Container, Typography, Wrapper } from '@supercarmarket/ui';
import type { UseAuth } from 'hooks/useAuth';
import Link from 'next/link';
import * as React from 'react';
import { useRouter } from 'next/navigation';

import * as style from './resultId.styled';
import { useFormContext } from 'react-hook-form';

interface ResultIdProps {
  authState: UseAuth['authState'];
  resetField: UseAuth['resetField'];
}

const ResultId = (props: ResultIdProps) => {
  const { reset } = useFormContext();
  const { authState, resetField } = props;
  const { push } = useRouter();

  const { findIdResult } = authState;

  const handleClick = React.useCallback(() => {
    resetField();
    reset();
    push('/auth/find?type=password');
  }, [push, reset, resetField]);

  return (
    <Container display="flex" flexDirection="column" width="340px" gap="60px">
      {findIdResult.success && (
        <>
          <Wrapper css={style.content}>
            <Wrapper.Item css={style.desc}>
              <Typography
                as="h2"
                fontSize="header-20"
                fontWeight="bold"
                color="greyScale-6"
                lineHeight="120%"
              >
                고객님의 계정을 찾았습니다
              </Typography>
              <Typography
                as="p"
                fontSize="body-14"
                fontWeight="regular"
                color="greyScale-6"
                lineHeight="150%"
              >
                아이디를 확인 후 로그인 해주세요
              </Typography>
            </Wrapper.Item>
            <Wrapper.Item css={style.id}>
              <Typography
                as="h2"
                fontSize="header-20"
                fontWeight="bold"
                color="greyScale-6"
                lineHeight="120%"
              >
                {findIdResult.success.id}
              </Typography>
              <Typography
                fontSize="body-14"
                fontWeight="regular"
                color="greyScale-5"
                lineHeight="150%"
              >{`가입일 ${findIdResult.success.createAt}`}</Typography>
            </Wrapper.Item>
          </Wrapper>
          <Wrapper css={style.button}>
            <Button
              type="button"
              variant="Primary-Line"
              fullWidth
              onClick={handleClick}
            >
              비밀번호 찾기
            </Button>
            <Link href="/auth/signin" shallow>
              <Button type="button" variant="Primary" fullWidth>
                로그인
              </Button>
            </Link>
          </Wrapper>
        </>
      )}
    </Container>
  );
};

export default ResultId;
