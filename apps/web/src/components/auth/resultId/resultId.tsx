import * as React from 'react';
import { Button, Container, Typography, Wrapper } from '@supercarmarket/ui';
import Link from 'next/link';
import * as style from './resultId.styled';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'http/server/auth';
import dayjs from 'dayjs';

const ResultId = () => {
  const queryClient = useQueryClient();
  const findIdResult = queryClient.getQueryData<{
    data: {
      boardCount: number;
      createdDate: string;
      id: string;
      nickname: string;
      phone: string;
      userRating: string;
    };
  }>(QUERY_KEYS.findId());

  React.useEffect(() => {
    return () => {
      queryClient.resetQueries(QUERY_KEYS.all);
    };
  }, []);

  return (
    <Container display="flex" flexDirection="column" width="340px" gap="60px">
      {findIdResult?.data && (
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
                {findIdResult.data.id}
              </Typography>
              <Typography
                fontSize="body-14"
                fontWeight="regular"
                color="greyScale-5"
                lineHeight="150%"
              >{`가입일 ${dayjs(findIdResult.data.createdDate).format(
                'YYYY-MM-DD'
              )}`}</Typography>
            </Wrapper.Item>
          </Wrapper>
          <Wrapper css={style.button}>
            <Link href="/auth/find-password" shallow>
              <Button type="button" variant="Primary-Line" fullWidth>
                비밀번호 찾기
              </Button>
            </Link>
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
