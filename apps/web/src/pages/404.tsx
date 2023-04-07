import * as React from 'react';
import {
  applyMediaQuery,
  Button,
  Container,
  Typography,
  Wrapper,
} from '@supercarmarket/ui';
import Image from 'next/image';
import { css } from 'styled-components';
import { PageProps } from './_app';
import Link from 'next/link';
import { useDevice } from 'hooks/useDevice';

const NotFound = (props: PageProps) => {
  const { isMobile } = useDevice();

  return (
    <Container>
      <Wrapper
        css={css`
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 76px;
          ${applyMediaQuery('mobile')} {
            gap: 30.96px;
          }
        `}
      >
        <Wrapper.Item
          css={css`
            position: relative;
            width: 754.14px;
            height: 308.72px;
            ${applyMediaQuery('mobile')} {
              width: 267.59px;
              height: 111.04px;
            }
          `}
        >
          <Image
            src="/images/404.png"
            alt="404"
            fill
            priority
            sizes={`${applyMediaQuery('desktop')} 754.14px, ${applyMediaQuery(
              'mobile'
            )} 267.59px`}
          />
        </Wrapper.Item>
        <Wrapper.Item
          css={css`
            display: flex;
            flex-direction: column;
            gap: 16px;
            align-items: center;
          `}
        >
          <Wrapper.Top>
            <Typography
              as="h1"
              fontSize={isMobile ? 'header-20' : 'header-36'}
              fontWeight="bold"
              color="greyScale-6"
              lineHeight="120%"
            >
              페이지를 찾을 수 없습니다.
            </Typography>
          </Wrapper.Top>
          <Wrapper.Bottom
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              padding-bottom: 16px;
            `}
          >
            <Typography
              fontSize={isMobile ? 'body-14' : 'body-16'}
              fontWeight="regular"
              color="greyScale-6"
              lineHeight="150%"
            >
              요청하신 페이지가 사라졌거나 사용할 수 없는 페이지입니다.
            </Typography>
            <Typography
              fontSize={isMobile ? 'body-14' : 'body-16'}
              fontWeight="regular"
              color="greyScale-6"
              lineHeight="150%"
            >
              입력하신 주소가 맞는지 다시 한 번 확인해 주시기 바랍니다.
            </Typography>
            <Typography
              fontSize={isMobile ? 'body-14' : 'body-16'}
              fontWeight="regular"
              color="greyScale-6"
              lineHeight="150%"
            >
              서비스 이용에 불편을 드려 죄송합니다.
            </Typography>
          </Wrapper.Bottom>
          <Link href="/">
            <Button variant="Line" border="rounded">
              홈으로 가기
            </Button>
          </Link>
        </Wrapper.Item>
      </Wrapper>
    </Container>
  );
};

export default NotFound;
