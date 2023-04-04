import * as React from 'react';
import { useInterval } from '@supercarmarket/hooks';
import { Alert, applyMediaQuery, Container, Wrapper } from '@supercarmarket/ui';
import { useBanner } from 'http/server/home';
import { css } from 'styled-components';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import { createExternalLink } from '@supercarmarket/lib';

interface BannerProps {
  isMobile?: boolean;
}

interface BannerItemProps {
  imageUrl: string;
  currentIndex: number;
  index: number;
  url: string;
}

interface BannerDotProps {
  size: number;
  currentIndex: number;
}

const BannerItem = (props: BannerItemProps) => {
  const { imageUrl, url } = props;
  return (
    <Wrapper
      css={css`
        position: relative;
        width: 100%;
        height: 600px;
        flex: none;
        ${applyMediaQuery('mobile')} {
          width: 100%;
          height: 160px;
        }
      `}
    >
      <a
        href={createExternalLink(url)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={imageUrl}
          alt="배너 이미지"
          style={{
            objectFit: 'cover',
          }}
          sizes={`${applyMediaQuery('desktop')} 100vw, ${applyMediaQuery(
            'mobile'
          )} 400px`}
          fill
          priority
        />
      </a>
    </Wrapper>
  );
};

const BannerDot = (props: BannerDotProps) => {
  const { size, currentIndex } = props;
  return (
    <Wrapper
      css={css`
        position: absolute;
        display: flex;
        bottom: 20px;
        left: 50%;
        gap: 9px;
        ${applyMediaQuery('mobile')} {
          gap: 6px;
        }
      `}
    >
      {Array.from({ length: size }).map((_, index) => (
        <Wrapper.Item
          key={index}
          css={css`
            width: ${currentIndex === index ? '32px' : '8px'};
            height: 8px;
            transition: all 0.3s ease;
            border-radius: ${currentIndex === index ? '4px' : '50%'};
            background-color: ${({ theme }) => theme.color.white};
            ${applyMediaQuery('mobile')} {
              width: ${currentIndex === index ? '24px' : '6px'};
              height: 6px;
            }
          `}
        />
      ))}
    </Wrapper>
  );
};

const Banner = ({ isMobile }: BannerProps) => {
  const [index, setIndex] = React.useState(0);
  const { data, isLoading, isFetching, refetch } = useBanner(
    isMobile ? 'M' : 'D'
  );
  const handleIndex = React.useCallback(() => {
    const maxLength = data?.data.length;
    const nextIndex = maxLength === index + 1 ? 0 : index + 1;

    setIndex(nextIndex);
  }, [data, index]);

  useInterval(handleIndex, 4000);

  React.useEffect(() => {
    refetch();
  }, [isMobile]);

  if (isLoading || isFetching)
    return (
      <Container margin="8px 0 40px 0">
        <Skeleton width="100%" height={isMobile ? 160 : 600} />
      </Container>
    );

  return (
    <Container>
      <Wrapper
        css={css`
          position: relative;
          width: 100%;
          height: 600px;
          overflow: hidden;
          margin-top: 8px;
          margin-bottom: 40px;
          ${applyMediaQuery('mobile')} {
            width: 100%;
            height: 160px;
          }
        `}
      >
        {data && data.data.length > 0 ? (
          <>
            <Wrapper.Item
              css={css`
                display: flex;
                transition: all 0.3s ease-out;
                ${`transform: translateX(-${index}00%);`}
              `}
            >
              {data.data.map((banner, _index) => (
                <BannerItem
                  key={banner.imageUrl}
                  currentIndex={index}
                  index={_index}
                  {...banner}
                />
              ))}
            </Wrapper.Item>
            <BannerDot size={data.data.length} currentIndex={index} />
          </>
        ) : (
          <Wrapper.Item
            css={css`
              display: flex;
              padding-top: 100px;
              ${applyMediaQuery('mobile')} {
                padding-top: 50px;
              }
            `}
          >
            <Alert severity="info" title="배너 준비 중 입니다." />
          </Wrapper.Item>
        )}
      </Wrapper>
    </Container>
  );
};

export default Banner;
